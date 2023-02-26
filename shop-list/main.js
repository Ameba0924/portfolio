const items = document.querySelector('.items');
const footer_input = document.querySelector('.footer_input');
const addbtn = document.querySelector('.footer_btn');

function onAdd(){
  //1.사용자가 입력한 텍스트를 받아옴
  const text = footer_input.value;
  if(text === ''){
    footer_input.focus();
    return;
  }

  //2.새로운 아이템을 만듬(텍스트 + 삭제버튼)
  const item = createItem(text);  
  items.appendChild(item);
  //3. items컨테이너안에 새로만든 아이템을 추가
  //4. 새로 추가된 아이템으로 스클롤링
  item.scrollIntoView({block:'center'})
	  
  //5.인풋을초기화한다
  footer_input.value = '';  
  footer_input.focus();

}



function createItem(text){
  const itemRow = document.createElement('li');
  itemRow.setAttribute('class','item_row');

  const item = document.createElement('div');
  item.setAttribute('class','item');
  
 
  const name = document.createElement('span');
  name.setAttribute('class','item_name'); 
  name.innerText = text;


  const del_btn= document.createElement('button');
  del_btn.setAttribute('class','item_del');
  del_btn.innerHTML = '<i class="fas fa-trash-alt"></i>';
  
  del_btn.addEventListener('click',()=>{
    items.removeChild(itemRow);
  });
	
  const itemDivider = document.createElement('div');
  itemDivider.setAttribute('class','item_divider');
  item.appendChild(name);
 

  item.appendChild(del_btn);
  
  itemRow.appendChild(item);
  itemRow.appendChild(itemDivider);
  return itemRow; 
 
};


addbtn.addEventListener('click',() => {
  onAdd();
});


footer_input.addEventListener('keypress',(event)=>{
  if(event.key === 'Enter'){
    onAdd();
}



});










