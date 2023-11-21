// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{CustomMenuItem, Manager, SystemTray, SystemTrayEvent, SystemTrayMenu};
use tauri_plugin_positioner::{Position, WindowExt};

// the payload type must implement `Serialize` and `Clone`.
#[derive(Clone, serde::Serialize)]
struct Payload {
  message: String,
}

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
// #[tauri::command]
// fn greet(name: &str) -> String {
//     format!("Hello, {}! You've been greeted from Rust!", name)
// }

fn main() {
    let show = CustomMenuItem::new("show".to_string(), "Show").accelerator("option+space");
    let quit = CustomMenuItem::new("quit".to_string(), "Quit").accelerator("Cmd+Q");
    let hide = CustomMenuItem::new("hide".to_string(), "Hide").accelerator("Cmd+H");

    let system_tray_menu = SystemTrayMenu::new()
        .add_item(show)
        .add_item(hide)
        .add_item(quit);

    tauri::Builder::default()
        .plugin(tauri_plugin_positioner::init())
        .system_tray(SystemTray::new().with_menu(system_tray_menu))
        .on_system_tray_event(|app, event| {
            tauri_plugin_positioner::on_tray_event(app, &event);
            match event {
                // SystemTrayEvent::LeftClick {
                //     // position: _,
                //     // size: _,
                //     position,
                //     size,
                //     ..
                // } => {
                //     println!("Left clicked at position {:?} with size {:?}", position, size);
                //     let window = app.get_window("main").unwrap();
                //     // use TrayCenter as initial window position
                //     let _ = window.move_window(Position::TrayCenter);
                //     if window.is_visible().unwrap() {
                //         window.hide().unwrap();
                //     } else {
                //         window.show().unwrap();
                //         window.set_focus().unwrap();
                //     }
                // }
                SystemTrayEvent::RightClick {
                    position: _,
                    size: _,
                    ..
                } => {
                    println!("system tray received a right click");
                }
                SystemTrayEvent::DoubleClick {
                    position: _,
                    size: _,
                    ..
                } => {
                    println!("system tray received a double click");
                }
                SystemTrayEvent::MenuItemClick { id, .. } => match id.as_str() {
                    "show" => {
                        let window: tauri::Window = app.get_window("main").unwrap();
                        // use TrayCenter as initial window position
                        let _ = window.move_window(Position::TrayCenter);
                        if window.is_visible().unwrap() {
                            window.hide().unwrap();
                        } else {
                            window.show().unwrap();
                            window.set_focus().unwrap();
                        }
                    }
                    "quit" => {
                        std::process::exit(0);
                    }
                    "hide" => {
                        let window = app.get_window("main").unwrap();
                        window.hide().unwrap();
                    }
                    _ => {}
                },
                _ => {}
            }
        })
        .on_window_event(|event| match event.event() {
            tauri::WindowEvent::Focused(is_focused) => {
                // detect click outside of the focused window and hide the app
                if !is_focused {
                    event.window().hide().unwrap();
                }
            }
            _ => {}
        })
        .setup(|app| {
            // #[cfg(debug_assertions)] // only include this code on debug builds
            // {
            //   let window = app.get_window("main").unwrap();
            //   window.open_devtools();
            // //   window.close_devtools();
            // }
        
            // listen to the `event-name` (emitted on any window)
            // let id = app.listen_global("event-name", |event| {
            app.listen_global("event-name", |event| {
              println!("got event-name with payload {:?}", event.payload());
            });
            // unlisten to the event using the `id` returned on the `listen_global` function
            // a `once_global` API is also exposed on the `App` struct
            // app.unlisten(id);
      
            // emit the `event-name` event to all webview windows on the frontend
            app.emit_all("event-name", Payload { message: "Tauri is awesome!".into() }).unwrap();
            Ok(())
          })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
