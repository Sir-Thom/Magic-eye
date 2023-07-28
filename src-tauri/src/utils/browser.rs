use open::that;
use tauri::command;
// this function open a specific url in the user browser
#[command]
pub fn open_web_browser(link: String) {
    that(link).ok();
}
