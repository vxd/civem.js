(function() {
	function getInputHandler(inputCallback) {
		return function(event) {
			event.target.setCustomValidity("");
			if (inputCallback) {
				inputCallback(event);
			}
		};
	}

	function getInvalidHandler(invalidCallback) {
		return function(event) {
			var element = event.target;
			var validity = element.validity;
			var suffix = validity.valueMissing? "value-missing" : validity.typeMismatch? "type-mismatch" : validity.patternMismatch? "pattern-mismatch" : validity.tooLong? "too-long" : validity.rangeUnderflow ? "range-underflow" : validity.rangeOverflow? "range-overflow" : validity.stepMismatch? "step-mismatch" : validity.customError? "custom-error" : "";
			var specificErrormessage, genericErrormessage;
			if (suffix && (specificErrormessage === element.getAttribute("data-errormessage-" + suffix))) {
				element.setCustomValidity(specificErrormessage);
			} else if (genericErrormessage === element.getAttribute("data-errormessage")) {
				element.setCustomValidity(genericErrormessage);
			} else {
				element.setCustomValidity(element.validationMessage);
			}
			if (invalidCallback) {
				invalidCallback(event);
			}
		};
	}

	var civem = function() {
		var formElements = [];
		var inputElements = document.getElementsByTagName("input");
		var i;
		for (i = 0; i < inputElements.length; i++) {
			formElements.push(inputElements[i]);
		}
		var textareaElements = document.getElementsByTagName("textarea");
		for (i = 0; i < textareaElements.length; i++) {
			formElements.push(textareaElements[i]);
		}
		var selectElements = document.getElementsByTagName("select");
		for (i = 0; i < selectElements.length; i++) {
			formElements.push(selectElements[i]);
		}
		for (i = 0; i < formElements.length; i++) {
			var formElement = formElements[i];
			if (!formElement.willValidate) {
				continue;
			}
			var inputCallback;
			if (formElement.oninput) {
				inputCallback = formElement.oninput;
			}
			formElement.oninput = getInputHandler(inputCallback);
			var invalidCallback;
			if (formElement.oninvalid) {
				invalidCallback = formElement.oninvalid;
			}
			formElement.oninvalid = getInvalidHandler(invalidCallback);
		}
	};

	if (window.addEventListener) {
		window.addEventListener('load', civem, false);
	} else if (window.attachEvent) {
		window.attachEvent('onload', civem);
	}
}());
