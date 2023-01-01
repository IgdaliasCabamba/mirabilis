class WMPreviewXScrollable {
    constructor(elementQuery, enabled=true) {
        this.pos = { top: 0, left: 0, x: 0, y: 0 };
        this.elementQuery = elementQuery;
        this.isEnabled = enabled;
        this.canDrag = false;
        this.main();
    };

    get touch(){
        return document.querySelector(`${this.elementQuery} [MTouchArea]`);
    };
    get widget(){
        return document.querySelector(this.elementQuery);
    };

    get enabled(){
        return this.isEnabled;
    };

    enable(){
        this.isEnabled = true;
    };
    disable(){
        this.isEnabled = false;
    };

    main() {
        
        this.touch.addEventListener("dragstart", (event)=>{
            if (this.isEnabled){
                this.canDrag = true;
                this.dragHandler(event);
            };
        });
        
        this.touch.addEventListener("dragend", (event)=>{
            if (this.isEnabled){
                this.draggingHandler(event);
                this.canDrag = false;
                this.dropHandler(event);
            };
        });
        
        document.addEventListener('drag', (event)=>{
            if (this.isEnabled){
                this.draggingHandler(event);
            };
        });
    };

    dragHandler(event) {
        const element = this.widget;

        element.style.cursor = 'grabbing';
        element.style.userSelect = 'none';

        this.pos = {
            left: element.scrollLeft,
            top: element.scrollTop,

            x: event.clientX,
            y: event.clientY,
        };
    };

    draggingHandler(event) {
        if (! this.canDrag){
            return;
        };
        const element = this.widget;

        const dx = event.clientX - this.pos.x;
        const dy = event.clientY - this.pos.y;

        element.scrollTop = this.pos.top - dy;
        element.scrollLeft = this.pos.left - dx;
    };

    dropHandler(event) {
        const element = this.widget;
        element.style.cursor = 'grab';
        element.style.removeProperty('user-select');
    };
};