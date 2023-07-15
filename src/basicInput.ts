import { window } from "vscode";

export async function commandPick() : Promise<string | undefined> {
    let i = 0;
    const result = await window.showQuickPick(['abstract_quantifiers', 'abstract_unknown_lsymbols', 'apply', 'assert', 'case', 'clear_but',
        'close_epsilon', 'compile_match', 'compute_hyp', 'compute_hyp_specified', 'compute_in_goal', 'compute_specified', 'congruence', 'cut', 'destruct',
        'destruct_rec', 'destruct_term', 'destruct_term_subst', 'detect_polymorphism', 'discriminate', 'discriminate_if_poly'], {
        placeHolder: 'type commands here',
        onDidSelectItem: item => window.showInformationMessage(`Focus ${++i}: ${item}`)
    });
    console.log(i);
    window.showInformationMessage(`Got: ${result}`);
    return result;
}
export async function subCommandPick(command: string) : Promise<number | undefined> {
    switch (command) {
        case "interrupt":
            break;
        case "listTransforms":
            let i = 0;
            const result = await window.showQuickPick(['abstract_quantifiers', 'abstract_unknown_lsymbols', 'apply', 'assert', 'case', 'clear_but',
                'close_epsilon', 'compile_match', 'compute_hyp', 'compute_hyp_specified', 'compute_in_goal', 'compute_specified', 'congruence', 'cut', 'destruct',
                'destruct_rec', 'destruct_term', 'destruct_term_subst', 'detect_polymorphism', 'discriminate', 'discriminate_if_poly'], {
                placeHolder: 'type commands here',
                onDidSelectItem: item => window.showInformationMessage(`Focus ${++i}: ${item}`)
            });
            console.log(i);
            window.showInformationMessage(`Got: ${result}`);
            return i;
            break;
        case "listProvers":
            break;
        case "listStrategies":
            break;
        case "print":
            break;
        case "search":
            break;
        case "searchAll":
            break;
    }
}

export async function showInputBox() {
    const result = await window.showInputBox({
        value: 'Type something',
        valueSelection: [2, 4],
        placeHolder: 'For example: fedcba. But not: 123',
        validateInput: text => {
            window.showInformationMessage(`Validating: ${text}`);
            return text === '123' ? 'Not 123!' : null;
        }
    });
    window.showInformationMessage(`Got: ${result}`);
}

