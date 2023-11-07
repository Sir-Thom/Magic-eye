use log::info;
use std::env;

pub fn setup_wayland() {
    let key = "GDK_BACKEND";
    //set it to xwayland if user is using wayland
    env::set_var(key, "x11");
    
    std::env::set_var("GTK_OVERLAY_SCROLLING", "0");
    info!("GDK_BACKEND: {:?}", env::var(key).unwrap());
}
