export const passageInfo = $state({ text: '' });
export function setPassageInfo(text = '') {
	passageInfo.text = text;
}
export function clearPassageInfo() {
	passageInfo.text = '';
}
