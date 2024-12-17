from selenium import webdriver
from selenium.webdriver.common.by import By
import time


# Hàm đăng nhập và mở trang MyInfo
def login_and_open_myinfo():
    # Khởi tạo EdgeDriver (Edge)
    driver = webdriver.Edge()

    try:
        # 1. Truy cập trang đăng nhập
        driver.get("http://localhost:3000/login")
        driver.maximize_window()
        print("Đã mở trang đăng nhập.")
        time.sleep(3)

        # 2. Nhập thông tin đăng nhập
        driver.find_element(By.XPATH, "//input[@type='text' and @placeholder='Nhập tên đăng nhập của bạn']").send_keys("admin1")
        driver.find_element(By.XPATH, "//input[@type='password' and @placeholder='Nhập mật khẩu của bạn']").send_keys("admin1")
        driver.find_element(By.XPATH, "//button[@type='submit' and text()='Đăng nhập']").click()
        print("Đã đăng nhập thành công.")
        time.sleep(5)

        # 3. Chờ trang cá nhân load và thực hiện click bằng JSPath
        print("Đang mở MyInfo...")
        myinfo_element = driver.execute_script(
            "return document.querySelector('#root > div > div > header > ul > li:nth-child(8) > span > div > li:nth-child(1) > span > a');"
        )
        if myinfo_element:
            driver.execute_script("arguments[0].click();", myinfo_element)
            print("Đã mở trang MyInfo thành công.")
        else:
            print("Không tìm thấy phần tử MyInfo.")

        # Thời gian để kiểm tra kết quả
        time.sleep(10)

    except Exception as e:
        print(f"Đã xảy ra lỗi: {e}")
    finally:
        print("Đã hoàn thành. Trình duyệt vẫn mở.")
        input("Nhấn Enter để đóng trình duyệt...")
        driver.quit()
        print("Đã đóng trình duyệt.")


# Chạy hàm
if __name__ == "__main__":
    login_and_open_myinfo()
