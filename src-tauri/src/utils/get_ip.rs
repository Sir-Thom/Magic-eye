#[tauri::command]
pub fn get_ip(ip: String) {
    println!("ip: {}", ip);
}
