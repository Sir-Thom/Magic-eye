use std::env;

pub fn get_os() -> String {
    let os = env::consts::OS;
    os.to_string()
}

pub fn setup_wayland() {
    let key = "GDK_BACKEND";

    //set it to xwayland if user is using wayland
    env::set_var(key, "x11");
}
