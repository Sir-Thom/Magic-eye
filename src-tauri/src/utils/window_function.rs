#[tauri::command]
pub fn close_window(window: tauri::Window) {
    window.close().expect("Failed to close window");
}

#[tauri::command]
pub fn minimize_window(window: tauri::Window) {
    window.minimize().expect("Failed to minimize window");
}

#[tauri::command]
pub fn maximize_window(window: tauri::Window) {
    if window.is_maximized().unwrap() == true {
        window.unmaximize().expect("Failed to unmaximize window");
        
    }else{window.maximize().expect("Failed to maximize window");}
  
}

#[tauri::command]
pub fn unmaximize_window(window: tauri::Window) {
    window.unmaximize().expect("Failed to unmaximize window");
}


