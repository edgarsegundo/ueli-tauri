// Inside your Rust backend
use std::fs;
use std::path::Path;

#[derive(Debug, Clone, serde::Serialize, serde::Deserialize)]
struct SharedData {
    name: String,
    id: String,
}

impl SharedData {
    fn new(name: &str, id: &str) -> Self {
        SharedData {
            name: name.to_string(),
            id: id.to_string(),
        }
    }
}

lazy_static::lazy_static! {
    static ref SHARED_DATA_PATH: &'static Path = Path::new("shared_data.json");
    static ref SHARED_DATA: SharedData = load_data().unwrap_or_else(|_| SharedData::new());
}

fn load_data() -> Result<SharedData, Box<dyn std::error::Error>> {
    let json_data = fs::read_to_string(&*SHARED_DATA_PATH)?;
    Ok(serde_json::from_str(&json_data)?)
}

fn save_data(data: &SharedData) -> Result<(), Box<dyn std::error::Error>> {
    let json_data = serde_json::to_string_pretty(data)?;
    fs::write(&*SHARED_DATA_PATH, json_data)?;
    Ok(())
}

#[tauri::command]
fn get_shared_data() -> SharedData {
    SHARED_DATA.clone()
}

#[tauri::command]
fn save_shared_data(data: SharedData) -> Result<(), Box<dyn std::error::Error>> {
    save_data(&data)?;
    Ok(())
}
