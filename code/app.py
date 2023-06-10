from flask import Flask, render_template, request, session, flash, redirect, url_for
import mysql.connector

app = Flask(__name__, template_folder='../templates', static_folder='../static')

app.config['SECRET_KEY'] = 'the random string'

conn = mysql.connector.connect(
    host="localhost",
    user="root",
    port="3306",
    passwd="sudheer123",
    database="details"
)
cursor = conn.cursor()


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/login')
def login():
    return render_template('login.html')


@app.route('/admin')
def admin():
    return render_template('admin.html')


@app.route('/register')
def register():
    return render_template('register.html')


@app.route('/home')
def home():
    return render_template('home.html')


@app.route('/cart')
def cart():
    return render_template('cart.html')

@app.route('/products')
def products():
    return render_template('products.html')


@app.route('/login_validation', methods=['POST'])
def login_validation():
    email = request.form.get("email")
    password = request.form.get("password")
    cursor.execute("select * from users where email='{}' and password='{}'".format(email, password))
    users = cursor.fetchall()
    if len(users) > 0:
        session['email'] = email
        return render_template('home.html')
    else:
        flash('Invalid user', 'danger')
        return render_template('login.html')


@app.route('/adminlogin_validation', methods=['POST'])
def adminlogin_validation():
    email = request.form.get("aemail")
    password = request.form.get("apassword")
    cursor.execute("select * from admin where email='{}' and password='{}'".format(email, password))
    users = cursor.fetchall()
    if len(users) > 0:
        flash('admin logged in successfully', 'success')
        cursor.execute("select * from products")
        data = cursor.fetchall()
        print(data)
        return render_template('stock.html', data=data)

    else:
        return render_template('admin.html')


@app.route('/add_user', methods=['POST'])
def add_user():
    name = request.form.get("uname")
    email = request.form.get("uemail")
    password = request.form.get("upassword")

    sql = "INSERT INTO users (user_id,name,email,password) VALUES(NULL,%s,%s,%s)"
    val = (name, email, password)
    cursor.execute(sql, val)
    conn.commit()
    flash('User registered successfully', 'success')
    return render_template('register.html')


@app.route('/logout', methods=['POST', 'GET'])
def logout():
    session.pop('email', None)
    return render_template('login.html')


@app.route('/addstock', methods=['POST', 'GET'])
def addstock():
    product_id = request.form.get("product_id")
    total_stock = request.form.get("total_stock")
    sql = " update products set total_stock = total_stock+ %s where product_id = %s;"
    val = (product_id, total_stock)
    cursor.execute(sql, val)
    conn.commit()
    cursor.execute("select * from products ")
    data = cursor.fetchall()
    return render_template('stock.html', data=data)


@app.route('/profile', methods=['GET', 'POST'])
def profile():
    email = session.get('email')
    cursor.execute("select * from users where email='{}'".format(email))
    data = cursor.fetchall()
    return render_template('profile.html', data=data)


if __name__ == "__main__":
    app.run(debug=True)
