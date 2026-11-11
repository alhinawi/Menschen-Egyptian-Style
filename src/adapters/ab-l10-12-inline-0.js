export default function mount(){
document.querySelector('#pageJump').innerHTML=Array.from({length:24},(_,i)=>'<option value="'+i+'">Seite '+(78+i)+'</option>').join('')
}
