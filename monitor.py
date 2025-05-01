import time, psutil
from datetime import datetime
from pynput import mouse, keyboard
from utils import get_connection

last_input_time = time.time()

def on_input(x=None, y=None):
    global last_input_time
    last_input_time = time.time()
    

mouse.Listener(on_move = on_input, on_click = on_input, on_scroll = on_input).start()

keyboard.Listener(on_press = on_input).start()

def log_activity(employee_id):
    conn = get_connection()
    cursor = conn.cursor()
    now = datetime.now()
    
    for proc in psutil.process_iter(['name']):
        try: 
            cursor.execute("INSERT INTO activity_log (employee_id, process_name, timestamp) VALUES (%s, %s, %s)",
                           (employee_id, proc.info['name'], now))
        except:
            continue
    conn.commit()
    conn.close()
    print(f"Logged activity for employee {employee_id} at {now}")

def check_idle(employee_id,idle_threshold = 300):
    global last_input_time
    now = time.time()
    idle_duration = now - last_input_time
    if idle_duration > idle_threshold:
        idle_start = datetime.fromtimestamp(last_input_time)
        idle_end = datetime.now()
        conn = get_connection()
        cursor = conn.cursor()
        cursor().execute("INSERT INTO idle_logs (employee_id, idle_start, idle_end, duration_seconds) VALUES (%s, %s, %s, %s)",
                       (employee_id, idle_start, idle_end, int(idle_duration)))
        conn.commit()
        conn.close()
        last_input_time = time.time() #reset