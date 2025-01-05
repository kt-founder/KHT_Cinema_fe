from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time


# Hàm đăng nhập và chọn phim
def login_and_select_movie():
    # Khởi tạo EdgeDriver (Edge)
    driver = webdriver.Edge()

    try:
        # 1. Truy cập trang đăng nhập
        driver.get("http://localhost:3000/login")
        driver.maximize_window()
        print("Đã mở trang đăng nhập.")

        # Chờ trang đăng nhập tải xong
        WebDriverWait(driver, 20).until(
            EC.presence_of_element_located((By.XPATH, "//input[@type='text' and @placeholder='Nhập tên đăng nhập của bạn']"))
        )

        # 2. Nhập thông tin đăng nhập
        driver.find_element(By.XPATH, "//input[@type='text' and @placeholder='Nhập tên đăng nhập của bạn']").send_keys("admin1")
        driver.find_element(By.XPATH, "//input[@type='password' and @placeholder='Nhập mật khẩu của bạn']").send_keys("admin1")
        driver.find_element(By.XPATH, "//button[@type='submit' and text()='Đăng nhập']").click()
        print("Đã đăng nhập thành công.")

        # Chờ trang chính tải xong
        WebDriverWait(driver, 20).until(
            EC.presence_of_element_located((By.XPATH, "//a[contains(text(), 'Tee Yod: Quỷ Ăn Tạng Phần 2')]"))
        )

        # 3. Chọn phim từ danh sách
        print("Đang tìm phim Tee Yod: Quỷ Ăn Tạng Phần 2...")
        movie_element = driver.find_element(By.XPATH, "/html/body/div/div/div/div/main/div/div[2]/div[1]/div/div/div/div[6]/div/div/div/div[2]/div/div/div[1]/a")
        if movie_element:
            movie_element.click()
            print("Đã chọn phim thành công.")
        else:
            print("Không tìm thấy phim Tee Yod: Quỷ Ăn Tạng Phần 2.")

        # Chờ trang chi tiết tải xong (nếu cần)
        time.sleep(5)
        # 4. Chọn ngày xuất chiếu đầu tiên
        WebDriverWait(driver, 20).until(
            EC.presence_of_element_located((By.CLASS_NAME, "date-selector"))
        )
        date_button = driver.find_element(By.CLASS_NAME, "date-selector").find_elements(By.TAG_NAME, "button")[0]
        date_button.click()
        print("Đã chọn ngày đầu tiên.")
        time.sleep(3)

        # 5. Chọn giờ chiếu đầu tiên
        time_button = driver.find_element(By.CLASS_NAME, "time-selector").find_elements(By.TAG_NAME, "button")[0]
        time_button.click()
        print("Đã chọn giờ chiếu đầu tiên.")
        time.sleep(3)

        # 6. Chọn ghế đầu tiên còn trống
        WebDriverWait(driver, 20).until(
            EC.presence_of_element_located((By.CLASS_NAME, "seat-layout"))
        )
        available_seat = driver.find_element(By.CLASS_NAME, "seat-layout").find_elements(By.CLASS_NAME, "standard")[0]
        available_seat.click()
        print("Đã chọn ghế đầu tiên.")
        time.sleep(2)

        # 7. Nhấn nút "Thanh Toán"
        checkout_button = driver.find_element(By.XPATH, "/html/body/div/div/div/div[2]/div[4]/button")
        checkout_button.click()
        print("Đã thực hiện thanh toán.")

        # Đợi xem kết quả
        time.sleep(10)
        # 8. Chọn phương thức thanh toán
        vn_pay_button = driver.find_element(By.XPATH, "/html/body/div/div/div/div[2]/div[2]/div/div[2]/img")
        vn_pay_button.click()
        print("Đã chọn xong phương thức thanh toán.")
        # 9. Click Thanh toan
        check_out = driver.find_element(By.XPATH, "/html/body/div/div/div/div[2]/div[2]/button")
        check_out.click()
        print("Đã chuyen den trang thanh toan.")
        time.sleep(5)
        driver.find_element(By.XPATH, "/html/body/div[2]/div[2]/div/div/div[2]/div/div/div/div[3]/div/div[2]/form/div/div[2]/div/div/div[1]/div/div[1]/label/input[1]").send_keys(
            "9704198526191432198")
        driver.find_element(By.XPATH, "/html/body/div[2]/div[2]/div/div/div[2]/div/div/div/div[3]/div/div[2]/form/div/div[2]/div/div/div[2]/div/div[1]/label/input").send_keys(
            "NGUYEN VAN A")
        driver.find_element(By.XPATH, "/html/body/div[2]/div[2]/div/div/div[2]/div/div/div/div[3]/div/div[2]/form/div/div[2]/div/div/div[3]/div/div[1]/label/input").send_keys(
            "07/15")
        print("Nhap thanh cong.")
        time.sleep(5)
        driver.find_element(By.XPATH, "/html/body/div[2]/div[2]/div/div/div[2]/div/div/div/div[3]/div/div[2]/form/div/div[3]/div[2]/div[2]/a").click()
        time.sleep(5)
        acp = driver.find_element(By.XPATH, "/html/body/div[8]/div/div/div[3]/div/div[2]/a")
        acp.click()
        print("Da Dong y")
        time.sleep(5)
        driver.find_element(By.XPATH,
                            "/html/body/div[2]/div[2]/div/div/div[2]/div/div/div/div[3]/div/div[2]/form/div/div[1]/div/div[1]/div/div[1]/label/input").send_keys(
            "123456")
        acp = driver.find_element(By.XPATH, "/html/body/div[2]/div[2]/div/div/div[2]/div/div/div/div[3]/div/div[2]/form/div/div[3]/div/div[2]/button")
        acp.click()
        print("Thanh toan thanh cong.")
        # Đợi xem kết quả
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
    login_and_select_movie()
