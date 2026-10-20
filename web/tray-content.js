/* Local, declarative content for the candidate tray's tiny theatre. */
(() => {
  'use strict';
  const theater = globalThis.TileTheater = globalThis.TileTheater || {};
  const freeze = value => {
    if (value && typeof value === 'object' && !Object.isFrozen(value)) {
      Object.values(value).forEach(freeze);
      Object.freeze(value);
    }
    return value;
  };
  const motion = (duration, keyframes, easing = 'ease-out') => ({duration, keyframes, easing});
  const motions = freeze({
    bounce: motion(160, [{transform:'translateY(0) scale(.91)'}, {transform:'translateY(-5px) scale(1.05)',offset:.55}, {transform:'translateY(0) scale(1)'}]),
    sway: motion(180, [{transform:'rotate(-7deg)'}, {transform:'rotate(7deg)',offset:.55}, {transform:'rotate(0)'}]),
    wobble: motion(160, [{transform:'translateX(0)'}, {transform:'translateX(-3px) rotate(-3deg)',offset:.3}, {transform:'translateX(3px) rotate(3deg)',offset:.65}, {transform:'translateX(0) rotate(0)'}]),
    shy: motion(180, [{transform:'scale(.94) rotate(-5deg)'}, {transform:'scale(1) rotate(0)'}]),
    nod: motion(180, [{transform:'translateY(0)'}, {transform:'translateY(3px) rotate(3deg)',offset:.5}, {transform:'translateY(0) rotate(0)'}]),
    hop: motion(160, [{transform:'translateY(0)'}, {transform:'translateY(-7px)',offset:.5}, {transform:'translateY(0)'}]),
    rumble: motion(140, [{transform:'translateY(0)'}, {transform:'translateY(-2px) rotate(-2deg)',offset:.25}, {transform:'translateY(1px) rotate(2deg)',offset:.65}, {transform:'translateY(0) rotate(0)'}]),
    peek: motion(180, [{transform:'rotate(0)'}, {transform:'translateX(3px) rotate(7deg)',offset:.6}, {transform:'translateX(0) rotate(0)'}]),
    startle: motion(180, [{transform:'scale(1)'}, {transform:'translateY(-4px) scale(.87)',offset:.35}, {transform:'translateY(0) scale(1)'}]),
    lean: motion(180, [{transform:'rotate(0)'}, {transform:'rotate(-8deg) translateX(-2px)',offset:.65}, {transform:'rotate(0) translateX(0)'}]),
    clear: motion(220, [{opacity:1,transform:'scale(1)'}, {opacity:1,transform:'scale(1.06)',offset:.25}, {opacity:0,transform:'scale(.8)'}]),
    still: motion(140, [{opacity:.72}, {opacity:1}]),
    fade: motion(180, [{opacity:1}, {opacity:0}])
  });
  const definitions = [
    ['apple','苹果','元气','bounce'], ['banana','香蕉','调皮','sway'],
    ['cherry','樱桃','默契双胞胎','sway'], ['grape','葡萄','胆小','wobble'],
    ['orange','橙子','豪爽','bounce'], ['strawberry','草莓','害羞','shy'],
    ['car','汽车','急性子','rumble'], ['taxi','出租车','热情','hop'],
    ['bus','巴士','稳重','nod'], ['train','火车','爱出风头','nod'],
    ['bicycle','自行车','轻快','sway'], ['scooter','小摩托','淘气','rumble'],
    ['cat','猫','好奇又傲娇','peek'], ['dog','狗','热情','hop'],
    ['rabbit','兔子','谨慎','shy'], ['panda','熊猫','慢半拍','nod'],
    ['fox','狐狸','机灵','peek'], ['bear','小熊','憨厚','bounce']
  ];
  // Actual durations in the local v02 manifest; used to keep cues inside a scene.
  const soundDurations = [.1,.12,.150023,.129977,.110023,.14,
    .1,.150023,.14,.129977,.12,.110023,.12,.110023,.089977,.14,.1,.129977];
  const profiles = freeze(Object.fromEntries(definitions.map(([code,name,personality,enterMotion],index) => [code, {
    code, name, personality, enter_sound:code, enter_motion:enterMotion,
    sound_duration_seconds:soundDurations[index],
    reaction_anchor:{x:.72,y:.14}, clear_motion:'clear', clear_sound:code,
    idle_motion:null
  }])));
  const fallbackProfile = freeze({
    code:'unknown',name:'小角色',personality:'好奇',enter_sound:'apple',enter_motion:'bounce',
    sound_duration_seconds:.1,
    reaction_anchor:{x:.72,y:.14},clear_motion:'clear',clear_sound:'apple',idle_motion:null
  });
  const script = (id, codes, priority, duration, cues) => ({
    id, codes, initiators:[...codes], priority, cooldown_ms:6000, duration_ms:duration, cues
  });
  const scripts = freeze([
    script('cat_inspects_apple',['apple','cat'],20,420,[
      {at:0,actor:'cat',motion:'lean',sound:true},
      {at:170,actor:'apple',motion:'wobble',reaction:'sweat',sound:true}
    ]),
    script('car_startles_cat',['car','cat'],30,420,[
      {at:0,actor:'car',motion:'rumble',sound:true},
      {at:170,actor:'cat',motion:'startle',reaction:'exclamation',sound:true}
    ]),
    script('banana_hails_taxi',['banana','taxi'],20,400,[
      {at:0,actor:'banana',motion:'hop',reaction:'note',sound:true},
      {at:180,actor:'taxi',motion:'nod',reaction:'sparkle',sound:true}
    ]),
    script('dog_greets_bus',['dog','bus'],20,440,[
      {at:0,actor:'dog',motion:'hop',sound:true},
      {at:190,actor:'bus',motion:'nod',reaction:'note',sound:true}
    ]),
    script('rabbit_inspects_grape',['grape','rabbit'],20,440,[
      {at:0,actor:'rabbit',motion:'peek',sound:true},
      {at:180,actor:'grape',motion:'wobble',reaction:'sweat',sound:true}
    ]),
    script('train_wakes_panda',['train','panda'],30,450,[
      {at:0,actor:'train',motion:'nod',reaction:'note',sound:true},
      {at:230,actor:'panda',motion:'startle',reaction:'exclamation',sound:true}
    ]),
    script('first_trip',['apple','car','cat'],40,570,[
      {at:0,actor:'car',motion:'rumble',sound:true},
      {at:180,actor:'apple',motion:'bounce',reaction:'note',sound:true},
      {at:360,actor:'cat',motion:'nod',reaction:'heart',sound:true}
    ]),
    script('sleepy_fruit_train',['grape','train','panda'],40,590,[
      {at:0,actor:'train',motion:'rumble',reaction:'note',sound:true},
      {at:180,actor:'grape',motion:'wobble',reaction:'sweat',sound:true},
      {at:360,actor:'panda',motion:'nod',reaction:'sleep',sound:true}
    ])
  ]);
  Object.assign(theater, {profiles, scripts, motions, fallbackProfile});
})();
