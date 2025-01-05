from selenium import webdriver
from selenium.webdriver.common.by import By
import time
from selenium.webdriver.support.ui import WebDriverWait
import random
import string
import unicodedata
from selenium.webdriver.common.alert import Alert
from selenium.webdriver.common.keys import Keys
import tkinter as tk
# Khai bao bien driver



def fill_form(name, gender, email, address, tel):
    driver = webdriver.Chrome()
    driver.get('https://forms.gle/byizFVWdb1REcBtF7')
    driver.implicitly_wait(3) 
    inputs = driver.find_elements(By.CSS_SELECTOR,'input.whsOnd.zHQkBf')
    radiobutton = driver.find_elements(By.CSS_SELECTOR,'div.bzfPab.wFGF8')
   
    inputs_array =[name, email, address, tel]

    # Nhập các trường nhập text
    for i in range(len(inputs)):
        print('Nhap key')
        inputs[i].send_keys(inputs_array[i])
    print(gender)
    if 'nam' == gender:
         radiobutton[0].click()
    else:
        radiobutton[1].click()

    submit = driver.find_element(By.XPATH,'//*[@id="mG61Hd"]/div[2]/div/div[3]/div[1]/div/div/span/span')    
    submit.click()
    # Form tiếp theo
    driver.implicitly_wait(1)
    # next = driver.find_element(By.XPATH,'/html/body/div[1]/div[2]/div[1]/div/div[4]/a')
    # next.click()
    
    driver.close()


# Hàm tạo tên ngẫu nhiên

def generate_name():
    first_names = ["Nguyễn", "Trần", "Lê", "Phạm", "Hoàng", "Huỳnh", "Phan", "Vũ", "Bùi"]
    middle_names = ["Văn", "Thanh", "Minh", "Hữu", "Dức", "Thị"]
    last_names = ["Nam", "Hoa", "Linh", "Anh", "Tú", "Thu", "Bình", "Quốc", "Trang", "Duy"]
    return random.choice(first_names) + " " + random.choice(middle_names) + " " + random.choice(last_names)



# Tạo email ngẫu nhiên
def generate_email(name):
    domain = ["gmail.com", "outlook.com", "icloud.com"]
    name_without_accent = remove_accents(name.split()[0]+name.split()[2]).replace(" ", "").lower()
    return name_without_accent + str(random.randint(1, 999)) + "@" + random.choice(domain)

def remove_accents(input_str):
    nfkd_form = unicodedata.normalize('NFKD', input_str)
    return u"".join([c for c in nfkd_form if not unicodedata.combining(c)])

# Tạo địa chỉ ngẫu nhiên
def generate_address():
    streets = ["Đường Hồ Chí Minh", "Đường Lê Lợi", "Đường Trần Hưng Đạo", "Đường Nguyễn Huệ", "Đường Bà Triệu", "Đường Phan Chu Trinh"]
    cities = ["Hà Nội", "Hồ Chí Minh", "Đà Nẵng", "Hải Phòng", "Cần Thơ", "Huế", "Hải Dương"]
    return str(random.randint(1, 999)) + " " + random.choice(streets) + ", " + random.choice(cities) + ", Việt Nam"

# Tạo số điện thoại ngẫu nhiên
def generate_phone():
    return ''.join(random.choices(string.digits, k=10))
def generate_gender(name):
    # Phân tích tên để xác định giới tính
    first_name = name.split()[0]
    middle_name = name.split()[1]
    # Kiểm tra xem tên có trong danh sách các họ Nam hay không
    if (first_name in ["Nam",  "Anh", "Tú",  "Bình", "Quốc", "Duy"]):
        return "nam"
    # Kiểm tra xem tên có trong danh sách các họ Nữ hay không
    else:
        return "nu"

# n = int('Nhap so luong form can dien: ',input())
# for i in range(2):
#     # Tạo Các dữ liệu
#     name = generate_name()
#     gender = generate_gender(name)
#     email = generate_email(name)
#     address = generate_address()
#     phone = generate_phone()
#     #Gọi hàm
#     fill_form(name,gender,email,address,phone)
def open_browser():
    # Khởi tạo trình duyệt Chrome
    driver = webdriver.Chrome()
    # Mở trang web bất kỳ
    driver.get('')
def run_auto_fill():
    # Lấy số form từ ô nhập liệu
    num_forms = int(num_forms_entry.get())
    # Chạy hàm tự động điền Google Form num_forms lần
    for _ in range(num_forms):
        name = generate_name()
        gender = generate_gender(name)
        email = generate_email(name)
        address = generate_address()
        phone = generate_phone()
        #Gọi hàm
        fill_form(name,gender,email,address,phone)
def auto_fill_fb():
    group_link = "https://www.facebook.com/groups/3702197756702921"
    driver = webdriver.Chrome()
    # driver.get(group_link)
    username = ""
    password = ""
    driver.get("https://www.facebook.com")

    # Điền thông tin đăng nhập và đăng nhập
    email_field = driver.find_element(By.ID,"email")
    email_field.send_keys(username)
    password_field = driver.find_element(By.ID,"pass")
    password_field.send_keys(password)
    password_field.send_keys(Keys.RETURN)

    # Đợi để đăng nhập thành công
    time.sleep(5)

    # Truy cập vào nhóm học tập
    driver.get(group_link)

    # Đợi trang nhóm tải hoàn chỉnh
    time.sleep(10)

    # Click vào nút chia sẻ
    share = driver.find_element(By.XPATH,'/html/body/div[1]/div/div[1]/div/div[3]/div/div/div[1]/div[1]/div/div[2]/div/div/div[4]/div/div[2]/div/div/div/div[2]/div/div[3]/div/div/div/div/div/div/div/div/div/div[13]/div/div/div[4]/div/div/div[1]/div/div[2]/div/div[3]/div/div[1]/div[2]/span')
    # print(len(share))
    share.click()
    time.sleep(5)
    mess = driver.find_element(By.XPATH,'/html/body/div[1]/div/div[1]/div/div[4]/div/div/div[1]/div/div[2]/div/div/div/div/div/div/div[2]/div[2]/div/div/div/div[1]/form/div/div/div[2]/div/div/div/div[1]/div/div[1]/div[1]/p')
    mess.send_keys('Anh em chu y')
    time.sleep(5)
    send = driver.find_element(By.XPATH,'/html/body/div[1]/div/div[1]/div/div[4]/div/div/div[1]/div/div[2]/div/div/div/div/div/div/div[2]/div[2]/div/div/div/div[4]/div/div/div[2]/div/div/div[1]/div/div[1]/div/div[2]/span/span')
    send.click()
    # Đợi một chút để bài viết được chia sẻ
    # time.sleep(30)
    commit = driver.find_element(By.XPATH,'/html/body/div[1]/div/div[1]/div/div[4]/div/div/div[1]/div/div[2]/div/div/div/div/div[2]/div/div[2]/div[2]/div/div/div/div[3]/div/div/div[1]')
    commit.click()
    # Đóng trình duyệt
    driver.quit()
    # Link của nhóm học tập và nội dung bài viết muốn chia sẻ
    
    
    
    
# Tạo và định vị các thành phần giao diện
root = tk.Tk()
root.title("Browser Automation")
tk.Label(root, text="Tự động hóa trình duyệt").grid(row=0, column=0)
tk.Label(root, text="Điền form google tự động").grid(row=1, column=0)
tk.Label(root, text="Nhập số form:").grid(row=2, column=0)
num_forms_entry = tk.Entry(root)
num_forms_entry.grid(row=2, column=1)
run_button = tk.Button(root, text="Chạy hàm", command=run_auto_fill)
run_button.grid(row=2, column=2)
tk.Label(root, text="Tự động hóa Facebook").grid(row=3, column=0)
fb_button = tk.Button(root, text="Mở Facebook", command=auto_fill_fb)
fb_button.grid(row=3, column=1)

# Chạy ứng dụng
root.mainloop()


# driver.execute_script('document.querySelector("#video-title > yt-formatted-string").click()')
# driver.implicitly_wait(6)
# driver.execute_script('document.querySelector("#skip-button\\:n > span > button").click()')