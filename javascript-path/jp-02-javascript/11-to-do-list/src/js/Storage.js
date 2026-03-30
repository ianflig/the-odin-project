export class Storage{
    vault = [];
    constructor(){}

    addCategory(category){
        this.vault.push(category);
        console.log(`Category created, ID: ${category.id}`) 
    }

    deleteCategory(id){
        this.vault = this.vault.filter(ele => ele.id !== id);
        return true;
    }

    getCategoryByID(id){
        let category = this.vault.find(ele => ele.id === id);
        return category;
    }
}
