document.getElementById("myForm").style.display = "none";

const addBox = document.querySelector(".open-button")

const addBox1 = document.querySelector(".add-box")

const closeAddBox = document.querySelector(".btn_cancel")

const saveNoteBtn = document.querySelector(".save_btn")

const titleTag = document.querySelector("input")

const descTag = document.querySelector("textarea")

var notebook = JSON.parse(localStorage.getItem("notebook") || "[]");


closeAddBox.addEventListener("click", () => {
	document.getElementById("myForm").style.display = "none";
});


addBox.addEventListener("click", () => {
	document.getElementById("myForm").style.display = "block";
});


saveNoteBtn.addEventListener("click", () => {

	let title = titleTag.value.trim();
	let desc = descTag.value.trim();
	let note = {title, desc};
	
	notebook.push(note);
	localStorage.setItem("notebook", JSON.stringify(notebook));
	
	document.getElementById("myForm").style.display = "none";
	
	showNotes();

});


function del(id) {

	let confirmDel = confirm("Are you sure you want to delete this note?");
    
	if(!confirmDel) return;
	
	notebook.splice(id, 1);
    localStorage.setItem("notebook", JSON.stringify(notebook));
    
	showNotes();	
	
}


function showNotes() {
    if(!notebook) return;
	
    document.querySelectorAll(".note").forEach(li => li.remove());
    
	notebook.forEach((note, id) => {
        
		let filterDesc = note.desc.replaceAll("\n", '<br/>');
        
		let liTag = `
		<div class="wrapper">
			<li class="note">
				
					<div class="details">
							<button class="delete_btn_${id}" style="color: #0X0f;
							  outline: none;
							  border: none;
							  cursor: pointer;
							  font-size: 20px;
							  border-radius: 2px;
							  background: none;
							  margin-left: 380px; margin-bottom: -130px; float: right" type="button"> 🗑️ </button>
							<p>${note.title}</p>
                            <span>${filterDesc}</span>
							<div class="hidden_id" style="display: none;">
								${id}
							</div>
					</div>
			</li>
		</div>`;
		
        addBox1.insertAdjacentHTML("afterend", liTag);
		
		const cur_btn = document.querySelectorAll(`.delete_btn_${id}`)[0]
		
		cur_btn.addEventListener("click", () => {
			del(id)
		});

    });
}


showNotes();

