var deleteSelected = function(v){
	var options = document.querySelectorAll('[data-menu-size] [data-menu-size-option]');
	var choosenOptionElem = document.querySelector('[data-menu-size-result]');
	var selectAllElem = document.querySelector('[name=select_all]');
	var currentSize = 'all';

	
	Array.prototype.map.call(options, function(optionElem){
		console.log(optionElem);
		optionElem.onclick = function(e){
			var elem = this;
			currentSize = elem.getAttribute('data-menu-size-option');

			Array.prototype.forEach.call(options, function(elem){
				if(elem.getAttribute('data-menu-size-option') == currentSize){
					v.addClass('active',elem);
				} else {
					v.removeClass('active', elem);
				} 
			});
			choosenOptionElem.innerHTML = elem.innerHTML;
			selectAllElem.checked = false;

			setImagesStatus(currentSize);

		}
	});
	
	setImagesStatus(currentSize);

	selectAllElem.onchange  = function(e){
		if(this.checked){
			allEnabledCheckboxes = document.querySelectorAll('.image-wrapper .enabled input[type=checkbox]');
			for(var j = 0; j < allEnabledCheckboxes.length; j++){
				var nextEl = allEnabledCheckboxes[j];
				nextEl.checked = true;
			};
		};
	};

	var checkboxOnImageElem = document.querySelectorAll('.image-wrapper [data-size] input[type=checkbox]');
	for(var k = 0; k < checkboxOnImageElem.length; k++){
		checkboxOnImageElem[k].onchange = checkAndResetSelectAll;
	}
	function checkAndResetSelectAll(){
		if(!this.checked && selectAllElem.checked){
			selectAllElem.checked = false;
		}
	}


	function setImagesStatus(currentSize){
		allImages = document.querySelectorAll('[data-size]');
		for(var i = 0; i < allImages.length; i++){
			var elem = allImages[i];
			if(elem.getAttribute('data-size') == currentSize || currentSize == 'all'){
				v.addClass('enabled', elem);
			} else {
				v.removeClass('enabled', elem);
				if(elem.querySelector('input').checked){
					elem.querySelector('input').checked = false
				}
			}
		}
	}
		
	return	function deleteSelected(){
		var selectedCheckboxElem = document.querySelectorAll('.image-wrapper .check_wrapper input:checked');
		
		if(!selectedCheckboxElem || !selectedCheckboxElem.length){
			return
		}

		for(var i = 0; i <selectedCheckboxElem.length; i++){
			var elem = selectedCheckboxElem[i];
			elem.parentElement.parentElement.remove();
		}

		selectAllElem.checked = false;
	}
}(v)

