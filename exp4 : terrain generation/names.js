class nameGenerator {

    constructor(table){
        this.table = table;
    }

    getName(){
        return this.table.getString(int(random(0, table.getRowCount()-1)), 0);
    }
}