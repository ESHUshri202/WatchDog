from flask import Flask, render_template, request, jsonify
from utils import get_connection
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from functools import wraps
from datetime import datetime,timedelta
import jwt
import secrets



app = Flask(__name__)
CORS(app)

SECRET_KEY = secrets.token_hex(32) 

# JWT Authentication Decorator
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'message': 'Token is missing!'}), 401
        try:
            data = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token has expired!'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'message': 'Invalid token!'}), 401
        return f(*args, **kwargs)
    return decorated


# Admin Routes
@app.route('/create-admin', methods=['POST'])
def create_admin():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    
    if not (email and password):
        return jsonify({'error': 'Missing Fields'}), 400
    
    # Use pbkdf2:sha256 as the hashing method
    hashed_password = generate_password_hash(password, method='pbkdf2:sha256')
    
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute('INSERT INTO admin (email, password) VALUES (%s, %s)', (email, hashed_password))
    conn.commit()
    conn.close()
    
    return jsonify({'message': 'Admin created successfully'}), 201

@app.route('/admin-login',methods=['POST'])
def admin_login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if not (email and password):
        return jsonify({'error': 'Missing email or password'}), 400

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute('SELECT * FROM admin WHERE email = %s', (email,))
    admin = cursor.fetchone()
    conn.close()

    if admin and check_password_hash(admin['password'], password):
        payload = {
            'admin_id': admin['id'],
            'email': admin['email'],
            'exp': datetime.utcnow() + timedelta(hours=2)
        }
        token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')

        return jsonify({'message': 'Login successful', 'token': token}), 200
    else:
        return jsonify({'error': 'Invalid credentials'}), 401    




@app.route('/')

@token_required
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
@token_required
def get_employees():
    conn = get_connection()
    cursor = conn.cursor(dictionary = True)
    cursor.execute('SELECT * FROM employees ')
    employees = cursor.fetchall()
    conn.close()
    return jsonify(employees)


# Screenshot route
@app.route('/screenshot', methods=['GET'])
@token_required
def get_screenshot():
    conn = get_connection()
    cursor = conn.cursor(dictionary = True)
    cursor.execute('SELECT * FROM screenshots')
    screenshot = cursor.fetchall()
    conn.close()
    return jsonify(screenshot)


# Log acitivity
@app.route('/log-acitivity',methods = ['GET'])
@token_required
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
@token_required
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
