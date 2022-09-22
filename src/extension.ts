import { window, commands, ExtensionContext, Range, TextEdit, WorkspaceEdit, workspace, Selection, TextEditor } from 'vscode';

type ConversionKind = "super" | "sub";

// This method is called when your extension is activated. Activation is
// controlled by the activation events defined in package.json.
export function activate(context: ExtensionContext) {
    // This line of code will only be executed once when your extension is activated.
    console.log('Congratulations, your extension "supersub" is now active!');

    const supersub = new SuperSub();

    const superCmd = commands.registerCommand('supersub.super', () => {
        supersub.convert("super");
    });
    const subCmd = commands.registerCommand('supersub.sub', () => {
        supersub.convert("sub");
    });

    // Add to a list of disposables which are disposed when this extension is deactivated.
    context.subscriptions.push(superCmd);
    context.subscriptions.push(subCmd);
}

class SuperSub {
    private _superMap = new Map<string, string>();
    private _subMap = new Map<string, string>();

    constructor() {
        this._superMap.set("L", "ᴸ");
        this._superMap.set("I", "ᴵ");
        this._superMap.set("y", "ʸ");
        this._superMap.set("9", "⁹");
        this._superMap.set("0", "⁰");
        this._superMap.set("δ", "ᵟ");
        this._superMap.set("w", "ʷ");
        this._superMap.set("4", "⁴");
        this._superMap.set("l", "ˡ");
        this._superMap.set("Z", "ᶻ");
        this._superMap.set("P", "ᴾ");
        this._superMap.set("b", "ᵇ");
        this._superMap.set("7", "⁷");
        this._superMap.set(")", "⁾");
        this._superMap.set("h", "ʰ");
        this._superMap.set("6", "⁶");
        this._superMap.set("W", "ᵂ");
        this._superMap.set("=", "⁼");
        this._superMap.set("χ", "ᵡ");
        this._superMap.set("m", "ᵐ");
        this._superMap.set("-", "⁻");
        this._superMap.set("r", "ʳ");
        this._superMap.set("p", "ᵖ");
        this._superMap.set("c", "ᶜ");
        this._superMap.set("v", "ᵛ");
        this._superMap.set("d", "ᵈ");
        this._superMap.set("ϕ", "ᵠ");
        this._superMap.set("θ", "ᶿ");
        this._superMap.set("1", "¹");
        this._superMap.set("T", "ᵀ");
        this._superMap.set("o", "ᴼ");
        this._superMap.set("K", "ᴷ");
        this._superMap.set("e", "ᵉ");
        this._superMap.set("G", "ᴳ");
        this._superMap.set("t", "ᵗ");
        this._superMap.set("8", "⁸");
        this._superMap.set("β", "ᵝ");
        this._superMap.set("V", "ⱽ");
        this._superMap.set("M", "ᴹ");
        this._superMap.set("s", "ˢ");
        this._superMap.set("i", "ⁱ");
        this._superMap.set("k", "ᵏ");
        this._superMap.set("α", "ᵅ");
        this._superMap.set("A", "ᴬ");
        this._superMap.set("5", "⁵");
        this._superMap.set("2", "²");
        this._superMap.set("u", "ᶸ");
        this._superMap.set("H", "ᴴ");
        this._superMap.set("g", "ᵍ");
        this._superMap.set("(", "⁽");
        this._superMap.set("j", "ʲ");
        this._superMap.set("f", "ᶠ");
        this._superMap.set("D", "ᴰ");
        this._superMap.set("γ", "ᵞ");
        this._superMap.set("U", "ᵁ");
        this._superMap.set("E", "ᴱ");
        this._superMap.set("a", "ᵃ");
        this._superMap.set("N", "ᴺ");
        this._superMap.set("n", "ⁿ");
        this._superMap.set("B", "ᴮ");
        this._superMap.set("x", "ˣ");
        this._superMap.set("3", "³");
        this._superMap.set("R", "ᴿ");
        this._superMap.set("+", "⁺");
        this._superMap.set("J", "ᴶ");
        this._subMap.set("1", "₁");
        this._subMap.set(")", "₎");
        this._subMap.set("m", "ₘ");
        this._subMap.set("4", "₄");
        this._subMap.set("j", "ⱼ");
        this._subMap.set("7", "₇");
        this._subMap.set("β", "ᵦ");
        this._subMap.set("8", "₈");
        this._subMap.set("2", "₂");
        this._subMap.set("3", "₃");
        this._subMap.set("s", "ₛ");
        this._subMap.set("u", "ᵤ");
        this._subMap.set("χ", "ᵪ");
        this._subMap.set("5", "₅");
        this._subMap.set("t", "ₜ");
        this._subMap.set("h", "ₕ");
        this._subMap.set("-", "₋");
        this._subMap.set("ρ", "ᵨ");
        this._subMap.set("+", "₊");
        this._subMap.set("o", "ₒ");
        this._subMap.set("v", "ᵥ");
        this._subMap.set("r", "ᵣ");
        this._subMap.set("6", "₆");
        this._subMap.set("(", "₍");
        this._subMap.set("k", "ₖ");
        this._subMap.set("x", "ₓ");
        this._subMap.set("9", "₉");
        this._subMap.set("=", "₌");
        this._subMap.set("e", "ₑ");
        this._subMap.set("l", "ₗ");
        this._subMap.set("i", "ᵢ");
        this._subMap.set("ϕ", "ᵩ");
        this._subMap.set("a", "ₐ");
        this._subMap.set("p", "ₚ");
        this._subMap.set("n", "ₙ");
        this._subMap.set("θ", "₀");
    }

    public convert(kind: ConversionKind) {
        const editor = window.activeTextEditor;
        if (editor) {
            const edits = editor.selections.map((selection) => this.convertSelection(editor, kind, selection));
           
            const wsEdit = new WorkspaceEdit();
            wsEdit.set(editor.document.uri, edits);
            workspace.applyEdit(wsEdit);
        }
    }

    private convertSelection(editor: TextEditor, kind: ConversionKind, selection: Selection) {
        const editRange = new Range(selection.start, selection.end);
        const selectedString = editor.document.getText(editRange);
        const replacement = this.convertString(selectedString, kind);

        return new TextEdit(editRange, replacement);
    }

    private convertString(string: string, kind: ConversionKind) {
        return [...string].map((char) => this.getConversionMap(kind).get(char) ?? char).join("");
    }

    private getConversionMap(kind: ConversionKind) {
        switch (kind) {
            case "super": return this._superMap;
            case "sub": return this._subMap;
            default: throw new Error(`Unknown kind: (${kind})`);
        }
    }

}
