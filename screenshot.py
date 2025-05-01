import pyautogui , os 
from datetime import datetime
from utils import get_connection

def capture_screenshot(employee_id):
    now = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
    path = f'static/screenshots/{employee_id}_{now}.png'
    pyautogui.screenshot(path)
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO screenshots (employee_id, file_path, timestamp) VALUES (%s, %s, %s)",
                   (employee_id, path, datetime.now()))
    
    conn.commit()
    conn.close()