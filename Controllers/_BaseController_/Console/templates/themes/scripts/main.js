window.mainObj = {};

window.mainObj = {
    root: '',

    defined: function(val)
    {
        return val !== null && val !== undefined
    },
    include: function(url, callback)
    {
        let head = document.head;
        let script = document.createElement('script');

        script.type = 'text/javascript';
        script.src = "/web/templates/default/scripts/" + url;
        script.onreadystatechange = callback;
        script.onload = callback;
        head.appendChild(script);
    },
    copyText: function(button, selector, copyText = 'copy')
    {
        let target = document.querySelector(selector);

        if(this.defined(target)){
            let text = target.innerText;
            let tempField = document.createElement('TEXTAREA'),
                focus = document.activeElement;

            tempField.value = text;

            document.body.appendChild(tempField);
            tempField.select();
            document.execCommand('copy');
            document.body.removeChild(tempField);
            focus.focus();

            let anotherButtons = document.querySelectorAll('[onclick*="copyText"]');
            for(let i = 0; i < anotherButtons.length; i++){
                anotherButtons[i].innerHTML = copyText;
            }
            button.innerHTML = '&check; ' + copyText;
        }
    },

    modal: {
        selectorObject: false,
        exist: function(selector)
        {
            let selectorObject = document.querySelectorAll(selector);
            if(mainObj.defined(selectorObject)){
                this.selectorObject = selectorObject;
            }
            return this;
        },
        close: function(selector)
        {
            if(this.exist(selector).selectorObject){
                for(let id = 0; id < this.selectorObject.length; id++){
                    this.selectorObject[id].style.display = 'none';

                    document.body.style.overflow = 'auto';
                }
            }
            return this;
        },
        /**
         * Template render file for AJAX-object: assets/system/ajax.html
         * @param selector
         * @param ajaxObject = null
         * @returns {mainObj}
         */
        open: function(selector, ajaxObject)
        {
            // this.close('.modal-window');

            if(this.exist(selector).selectorObject){
                for(let id = 0; id < this.selectorObject.length; id++){
                    let sel = this.selectorObject[id];
                    sel.style.display = 'block';

                    document.body.style.overflow = 'hidden';

                    if(ajaxObject){

                        ajaxObject.open().headers().request().

                        onreadystatechange(function(xhr){
                            let modalBody = sel.querySelector('.modal-body-text');
                            if(mainObj.defined(modalBody)){
                                modalBody.innerHTML = xhr.responseText;
                            }
                        }).onerror(function(xhr){
                            console.log(xhr);
                        })
                            .send();
                    }
                }
            }
            return this;
        },
    }
};