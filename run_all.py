import time
from monitor import log_activity, check_idle
from screenshot import capture_screenshot
from utils import get_connection

def get_employee_id():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id FROM employees LIMIT 1")
    result = cursor.fetchone()
    conn.close()
    return result[0] if result else None

employee_id = get_employee_id();  # replace with dynamic ID if needed

while True:
    log_activity(employee_id)
    check_idle(employee_id)
    capture_screenshot(employee_id)
    time.sleep(300)  # repeat every 5 minutes
