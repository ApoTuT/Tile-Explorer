(function (root) {
  'use strict';
  const config = typeof module !== 'undefined' ? require('./settings.js') : root.TileSlideV06.config;
  const vectors = {up:[0,-1],down:[0,1],left:[-1,0],right:[1,0]};
  function releaseThreshold(cell) { return Math.min(config.releaseMax, Math.max(config.releaseMin, cell * config.releaseFraction)); }
  function chooseDirection(dx, dy) {
    const x = Math.abs(dx), y = Math.abs(dy);
    if (Math.max(x,y) < config.axisThreshold) return null;
    if (x >= y * config.axisRatio) return dx < 0 ? 'left' : 'right';
    if (y >= x * config.axisRatio) return dy < 0 ? 'up' : 'down';
    return null;
  }
  function projection(dx,dy,direction) {
    const vector = vectors[direction]; return vector ? dx * vector[0] + dy * vector[1] : 0;
  }
  function bindInput({board,view,getState,commit,onStart=()=>{},onEnd=()=>{},onReject=()=>{},
    isBusy=()=>false,isReducedMotion=()=>false,undo=()=>{},engine=root.TileSlideV06.engine}) {
    const doc = board.ownerDocument || root.document, listeners=[];
    const raf = root.requestAnimationFrame?.bind(root) || (fn=>root.setTimeout(fn,16));
    const caf = root.cancelAnimationFrame?.bind(root) || root.clearTimeout.bind(root);
    let gesture=null,destroyed=false;
    function listen(target,name,fn,options) {
      target.addEventListener(name,fn,options); listeners.push(()=>target.removeEventListener(name,fn,options));
    }
    const actionFor = current => ({type:'slide',tileId:current.tileId,direction:current.direction});
    function stopFrame(current) { if(current.frame!==null){caf(current.frame);current.frame=null;} }
    function finish(current,extra={}) {
      if(current.ended)return;current.ended=true;stopFrame(current);if(gesture===current)gesture=null;
      view.clearPreview();
      try { if(current.capture?.hasPointerCapture?.(current.pointerId))current.capture.releasePointerCapture(current.pointerId); } catch(_) {}
      onEnd({tileId:current.tileId,inputMode:'pointer',...extra});
    }
    function cancel() { if(gesture)finish(gesture,{cancelled:true});else view.clearPreview(); }
    function update(current,event) {
      current.dx=event.clientX-current.startX;current.dy=event.clientY-current.startY;
      if(!current.direction)current.direction=chooseDirection(current.dx,current.dy);
      current.distance=projection(current.dx,current.dy,current.direction);
    }
    function paint(current) {
      if(!current.direction || current.distance<=0){view.clearPreview();return;}
      const state=getState();
      if(state.revision!==current.revision || state.levelId!==current.levelId){view.clearPreview();return;}
      const check=engine.inspectAction(state,actionFor(current));
      view.preview(current.tileId,current.direction,check,current.distance/current.pitch);
    }
    function onDown(event) {
      if(destroyed || gesture || isBusy() || event.button!==0 || event.isPrimary===false)return;
      const node=event.target?.closest?.('[data-tile-id]');
      if(!node || (board.contains && !board.contains(node)))return;
      const state=getState(),tile=state.tiles.find(t=>t.id===node.dataset.tileId);
      if(!tile || state.status!=='playing')return;
      onStart({tileId:tile.id,inputMode:'pointer'});view.settle?.();
      node.focus?.({preventScroll:true});
      const metrics=view.metrics(),cell=metrics.cellSize||metrics.cell;
      gesture={tileId:tile.id,node,pointerId:event.pointerId,revision:state.revision,levelId:state.levelId,
        definitionHash:state.definitionHash,startX:event.clientX,startY:event.clientY,dx:0,dy:0,distance:0,
        direction:null,frame:null,pitch:metrics.pitch||cell,threshold:releaseThreshold(cell),ended:false,
        capture:typeof board.setPointerCapture==='function'?board:node};
      try { gesture.capture.setPointerCapture?.(event.pointerId); } catch(_) { cancel(); }
      event.preventDefault?.();
    }
    function onMove(event) {
      if(!gesture || event.pointerId!==gesture.pointerId)return;
      update(gesture,event);const current=gesture;
      if(current.frame===null)current.frame=raf(()=>{current.frame=null;if(gesture===current)paint(current);});
    }
    function onUp(event) {
      if(!gesture || event.pointerId!==gesture.pointerId)return;
      const current=gesture;stopFrame(current);update(current,event);
      if(!current.direction || current.distance<current.threshold){finish(current,{cancelled:true});return;}
      const state=getState();
      if(isBusy() || state.revision!==current.revision || state.levelId!==current.levelId || state.definitionHash!==current.definitionHash){
        finish(current,{cancelled:true});onReject({ok:false,kind:'blocked',reason:'stale',tileId:current.tileId,direction:current.direction});return;
      }
      const action=actionFor(current),check=engine.inspectAction(state,action);
      // Native pointer events finish before the app replaces consumed tile nodes.
      finish(current,{committed:check.ok});
      if(!check.ok){view.reject?.(current.tileId,current.direction,isReducedMotion());onReject({...check,tileId:current.tileId,direction:current.direction});return;}
      commit(action,{expectedRevision:current.revision,inputMode:'pointer'});
    }
    function onCancel(event){if(gesture && event.pointerId===gesture.pointerId)cancel();}
    function onLostCapture(event){if(gesture && event.pointerId===gesture.pointerId && (event.target===gesture.capture || event.target===gesture.node))cancel();}
    function onKey(event) {
      if(destroyed || event.isComposing)return;
      const target=event.target,editable=target?.isContentEditable || ['INPUT','TEXTAREA','SELECT'].includes(target?.tagName);
      if(editable)return;
      if(event.key==='Escape'){cancel();return;}
      if((event.ctrlKey||event.metaKey) && event.key?.toLowerCase()==='z' && !event.shiftKey){
        if(board.contains && !board.contains(target))return;
        if(isBusy() || event.repeat)return;event.preventDefault?.();cancel();undo();return;
      }
      const direction={ArrowUp:'up',ArrowDown:'down',ArrowLeft:'left',ArrowRight:'right'}[event.key];
      if(!direction || event.ctrlKey || event.metaKey || event.altKey || isBusy() || gesture)return;
      const node=target?.closest?.('[data-tile-id]');if(!node || (board.contains && !board.contains(node)))return;
      event.preventDefault?.();if(event.repeat)return;
      const state=getState();if(state.status!=='playing' || !state.tiles.some(t=>t.id===node.dataset.tileId))return;
      const tileId=node.dataset.tileId;onStart({tileId,inputMode:'keyboard'});view.settle?.();
      const action={type:'slide',tileId,direction},check=engine.inspectAction(state,action);
      if(check.ok)commit(action,{expectedRevision:state.revision,inputMode:'keyboard'});
      else {view.reject?.(tileId,direction,isReducedMotion());onReject({...check,tileId,direction});}
      onEnd({tileId,inputMode:'keyboard',committed:check.ok});
    }
    listen(board,'pointerdown',onDown);listen(board,'pointermove',onMove,{passive:true});listen(board,'pointerup',onUp);
    listen(board,'pointercancel',onCancel);listen(board,'lostpointercapture',onLostCapture);listen(doc,'keydown',onKey);
    return {cancel,destroy(){if(destroyed)return;destroyed=true;cancel();for(const remove of listeners)remove();}};
  }
  const api={bindInput,releaseThreshold,chooseDirection,projection};
  root.TileSlideV06=Object.assign(root.TileSlideV06||{},{input:api});
  if(typeof module!=='undefined')module.exports=api;
})(globalThis);
