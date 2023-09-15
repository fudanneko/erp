package tw.idv.erp.order.order.controller;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;




public class test {
    public static void main(String[] args) {
        // 資料庫連接資訊
        String jdbcUrl = "jdbc:mysql://localhost:3306/changfeng?serverTimezone=Asia/Taipei";
        String username = "root";
        String password = "0000";

        // 資料庫連接
        try {
            Connection connection = DriverManager.getConnection(jdbcUrl, username, password);

            // 創建 SQL 查詢
            String sql = "SELECT * FROM changfeng.order";

            // 創建查詢陳述式
            Statement statement = connection.createStatement();

            // 執行查詢
            ResultSet resultSet = statement.executeQuery(sql);

            System.out.println(resultSet);
            // 處理查詢結果
            while (resultSet.next()) {
                // 根據資料庫表格的結構，使用 resultSet.getXXX() 方法獲取資料
                int id = resultSet.getInt("orderId");
//                String name = resultSet.getString("name");
                // ... 其他欄位

                // 印出或處理資料
                System.out.println("ID: " + id);
            }

            // 關閉資源
            resultSet.close();
            statement.close();
            connection.close();

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
