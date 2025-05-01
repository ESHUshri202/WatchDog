from flask import Flask, render_template, request, jsonify
from utils import get_connection
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
@app.route('/')
def dashboard():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT * FROM activity_log ORDER BY timestamp DESC LIMIT 30")
    activities = cursor.fetchall()

    cursor.execute("SELECT * FROM screenshots ORDER BY timestamp DESC LIMIT 10")
    screenshots = cursor.fetchall()

    conn.close()
    return render_template("index.html", activities=activities, screenshots=screenshots)

@app.route('/list-employees', methods=['GET'])
def get_employees():
    conn = get_connection()
    cursor = conn.cursor(dictionary = True)
    cursor.execute('SELECT * FROM employees ')
    employees = cursor.fetchall()
    conn.close()
    return jsonify(employees)


# Screenshot route
@app.route('/screenshot', methods=['GET'])
def get_screenshot():
    conn = get_connection()
    cursor = conn.cursor(dictionary = True)
    cursor.execute('SELECT * FROM screenshots')
    screenshot = cursor.fetchall()
    conn.close()
    return jsonify(screenshot)


# Log acitivity
@app.route('/log-acitivity',methods = ['GET'])
def log_activity():
    conn = get_connection()
    cursor = conn.cursor(dictionary = True)
    cursor.execute('SELECT * FROM activity_log ')
    employees = cursor.fetchall()
    conn.close()
    return jsonify(employees)  
# def log_activity(employee_id):
#     conn = get_connection()
#     cursor = conn.cursor()
#     now = datetime.now()
    
#     for proc in psutil.process_iter(['name']):
#         try: 
#             cursor.execute("INSERT INTO activity_log (employee_id, process_name, timestamp) VALUES (%s, %s, %s)",
#                            (employee_id, proc.info['name'], now))
#         except:
#             continue
#     conn.commit()
#     conn.close()
#     print(f"Logged activity for employee {employee_id} at {now}")

@app.route('/create_employee',methods = ['POST'])
def create_employee():
    data = request.json
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')
    if not (name and email and password):
        return jsonify({'error': 'Missing Fields'}),400
    
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute('INSERT INTO employees (name,email,password) VALUES (%s,%s,%s)',(name,email,password))
    conn.commit()
    conn.close()
    
    return jsonify({'message': 'Employee created successfully'}),201

if __name__ == '__main__':
    app.run(debug=True)
