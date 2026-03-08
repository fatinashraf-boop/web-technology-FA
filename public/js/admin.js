if (!localStorage.getItem("token")) {
    window.location.href = "index.html";
}

let allItems = [];

async function loadItems() {

    const res = await fetch("/api/items", {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    });

    allItems = await res.json();

    renderItems(allItems);
}

function renderItems(items){

const table = document.getElementById("adminTableBody");
table.innerHTML = "";

if(items.length === 0){
table.innerHTML = "<tr><td colspan='8'>No items found</td></tr>";
return;
}

items.forEach(item=>{

const date = new Date(item.item_date).toLocaleDateString();

table.innerHTML += `
<tr>

<td>${item.id}</td>

<td>${item.title}</td>

<td>${item.category}</td>


<td>${item.location}</td>

<td>${date}</td>

<td>
${item.photo_path ? `<img src="${item.photo_path}" class="table-img">` : "No Photo"}
</td>

<td>
<select onchange="updateStatus(${item.id}, this.value)">

<option value="Lost" ${item.status==="Lost"?"selected":""}>Lost</option>
<option value="Found" ${item.status==="Found"?"selected":""}>Found</option>
<option value="Claimed" ${item.status==="Claimed"?"selected":""}>Claimed</option>

</select>
</td>

<td>

<button class="btn-delete" onclick="removeItem(${item.id})">
Delete
</button>

</td>

</tr>
`;

});
}

document.getElementById("searchInput").addEventListener("input", e=>{

const term = e.target.value.toLowerCase();

const filtered = allItems.filter(item =>

item.title.toLowerCase().includes(term) ||
item.category.toLowerCase().includes(term) ||
item.location.toLowerCase().includes(term)

);

renderItems(filtered);

});

async function updateStatus(id, status){

const res = await fetch("/api/items/status/"+id,{
method:"PUT",
headers:{
"Content-Type":"application/json",
"Authorization":"Bearer "+localStorage.getItem("token")
},
body:JSON.stringify({status})
});

const data = await res.json();

if(res.ok){
alert(data.message);
loadItems();
}else{
alert(data.message || "Failed to update status");
}

}

async function removeItem(id){

if(!confirm("Delete this item?")) return

const res = await fetch("/api/items/"+id,{
method:"DELETE",
headers:{
"Authorization":"Bearer "+localStorage.getItem("token")
}
})

if(res.ok) loadItems()

}

loadItems()