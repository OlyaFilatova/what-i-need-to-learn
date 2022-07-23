export class ParseIdioms {
    private static idiomsString = this.createIdiomsString();

    private static createIdiomsString() {
        const idioms = [];
        return idioms.join('|');
    }
}
