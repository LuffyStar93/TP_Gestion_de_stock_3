(function app(){
	"use strict";

	const doAjax = function doAjax(url, method, callback, data){
		try{
		const xhr = new XMLHttpRequest();
		xhr.open(method, url);
		xhr.setRequestHeader('Content-Type', 'application/json');
		data = data ? JSON.stringify(data) : null;
		if (method.toLowerCase() === "post"){
			if (!data) throw new Error("bad call");
		}

		xhr.onload = evt => callback(evt.target.response || evt.srcElement.response);
		xhr.send(data);
		} catch(err) { console.error(err); }
	 };


	 // TOGGLE BTN

	 const afficherProduits = function afficherProduits (){
	 	var btn_toggle_prod = document.getElementById("btn_toggle_produits");
	 	var produits = document.getElementById("toggle_produits");
	 	btn_toggle_prod.onclick = function(){
	 		produits.classList.toggle("is-hidden");
	 	}
	 };

	 const afficherMarques = function afficherMarques () {
	 	var btn_toggle_marques = document.getElementById("btn_toggle_marques");
	 	var marques = document.getElementById("toggle_marques");
	 	btn_toggle_marques.onclick = function(){
	 		marques.classList.toggle("is-hidden");
	 	}
	 };



	 //CREATE 

	 const createProduits = function createProduits(e){
		e.preventDefault();
		const url = "http://localhost:4444/api/v1/produits";
		doAjax(url, "POST", res => {
			console.log(JSON.parse(res));
		},{
			id_marque: document.getElementById("input_id_marque").value,
			nom: document.getElementById("input_produit").value,
			prix: document.getElementById('input_prix').value,
			description: document.getElementById('input_description').value
		});
		alert('Votre produit a été rajouté');
	};

	 const createMarques = function createMarques(e){
		e.preventDefault();
		const url = "http://localhost:4444/api/v1/marques";
		doAjax(url, "POST", res => {
			console.log(JSON.parse(res));
		},{
			name: document.getElementById("input_name_marque").value,

		});
		alert('Votre marque a été rajoutée');
	};

	// DELETE PRODUITS

	const deleteProduits = function deleteProduits(){
	  const produitsToDelete = Number(this.id.split("_")[1]);
	  const url = "http://localhost:4444/api/v1/produits"; 
	  doAjax(url, "DELETE", res => {
	  	console.log(JSON.parse(res));
	  }, {ids: produitsToDelete });
	  alert('Votre produit a été supprimé');
	};

	const prepareToDelete = function prepareToDelete(){
		var btn_supp_produits = document.getElementsByClassName("btn_supp_produits");
		var tableau_btn_supp = Array.from(btn_supp_produits);
		tableau_btn_supp.forEach(function(btn){
			btn.onclick = deleteProduits;
		});

	};

	// DELETE MARQUES

	const deleteMarques = function deleteMarques(){
	  const marquesToDelete = Number(this.id.split("_")[1]);
	  const url = "http://localhost:4444/api/v1/marques"; 
	  doAjax(url, "DELETE", res => {
	  	console.log(JSON.parse(res));
	  }, {ids: marquesToDelete });
	  alert('Votre marque a été supprimée');
	};

	const prepareToDelete2 = function prepareToDelete2(){
		var btn_supp_marques = document.getElementsByClassName("btn_supp_marques");
		var tableau_btn_supp2 = Array.from(btn_supp_marques);
		tableau_btn_supp2.forEach(function(btn){
			btn.onclick = deleteMarques;
		});
	};

		//UPDATE PRODUITS

	const produitsToPatch = function produitsToPatch (id) {
		const url = "http://localhost:4444/api/v1/produits"
	    const editProduits = Number(this.id.split("_")[1]);
	    var obj = {};
	    obj.id = editProduits;
	    obj.id_marque =  document.getElementById("input_id_marque").value,
		obj.nom = document.getElementById("input_produit").value,
		obj.prix = document.getElementById('input_prix').value,
		obj.description =  document.getElementById('input_description').value;
	    doAjax(url, "PATCH", res => {
	      console.log(JSON.parse(res));
	    }, obj);
	    alert('Votre produit a été modifié');
  	};

  const editBtnProduits = function editBtnProduits () {
    var btn_modif_produits = document.getElementsByClassName("btn_modif_produits");
    var tabEditBtnProduits = Array.from(btn_modif_produits);
    tabEditBtnProduits.forEach(function(btn) {
      btn.onclick = produitsToPatch;
    });
  };

	//UPDATE MARQUE

	const marquesToPatch = function marquesToPatch (id) {
		const url = "http://localhost:4444/api/v1/marques"
	    const editMarques = Number(this.id.split("_")[1]);
	    var obj = {};
	    obj.id = editMarques;
	    obj.name = document.getElementById("input_name_marque").value;
	    doAjax(url, "PATCH", res => {
	    console.log(JSON.parse(res));
      }, obj);
	     alert('Votre marque a été modifiée');
  	};

  const editBtnMarques = function editBtnMarques () {
    var btn_modif_marques = document.getElementsByClassName("btn_modif_marques");
    var tabEditBtnMarques = Array.from(btn_modif_marques);
    	tabEditBtnMarques.forEach(function(btn) {
      btn.onclick = marquesToPatch;
    });
  };



  function start(){

  		afficherProduits();
  		afficherMarques();
		document.getElementById('btn_add_produits').onclick = createProduits;
		document.getElementById('btn_add_marques').onclick = createMarques;
		prepareToDelete();
		prepareToDelete2();
		editBtnProduits();
		editBtnMarques();


	};

	window.addEventListener("DOMContentLoaded", start);

}());