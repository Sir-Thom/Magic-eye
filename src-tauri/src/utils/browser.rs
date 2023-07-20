use webbrowser::{open_browser, Browser::Default};
// this function open a specific url in the user browser
pub fn open_web_browser(url: String) {
    open_browser(Default, url.as_str()).ok();
}
