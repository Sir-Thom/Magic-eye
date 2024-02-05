use tauri::Manager;

#[tauri::command]
pub fn close_window(window: tauri::Window) {
    window.close().expect("Failed to close window");
}

#[tauri::command]
pub fn minimize_window(window: tauri::WebviewWindow) {
    window.minimize().expect("Failed to minimize window");
}

#[tauri::command]
pub fn maximize_window(window: tauri::WebviewWindow) {
    if window.is_maximized().unwrap() == true {
        window.unmaximize().expect("Failed to unmaximize window");
        
    }else{window.maximize().expect("Failed to maximize window");}
  
}

#[tauri::command]
pub fn unmaximize_window(window: tauri::WebviewWindow) {
    window.unmaximize().expect("Failed to unmaximize window");
}

#[tauri::command]
pub fn close_splashscreen(window: tauri::WebviewWindow) {
    // Close splashscreen
    if let Some(splashscreen) = window.get_webview_window("splashscreen"){
        splashscreen.close().expect("Failed to close splashscreen");
    }
    window.get_webview_window("main").expect("no window labeled 'main' found").show().unwrap();
    
  

}

