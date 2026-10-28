(function(root){
  'use strict';
  const chains={fruit:{name:'水果',names:['荔枝','橘子','苹果','桃子','西瓜'],color:'#e78362'},
    plant:{name:'植物',names:['种子','嫩芽','小树','大树'],color:'#69a878'},
    car:{name:'汽车',names:['小汽车','跑车','超跑'],color:'#689aca'}};
  const items={};
  for(const [chainId,chain] of Object.entries(chains)) chain.names.forEach((name,tier)=>{
    const id=chainId+'-'+tier;
    items[id]={id,name,chainId,tier,asset:'assets/slide-v06/'+id+'.svg',nextItemId:tier<chain.names.length-1?chainId+'-'+(tier+1):null};
  });
  const api={chains,items,item:(chain,tier)=>items[chain+'-'+tier]};
  root.TileSlideV07={...(root.TileSlideV07||{}),content:api};
  if(typeof module!=='undefined')module.exports=api;
})(globalThis);
