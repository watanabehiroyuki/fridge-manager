# Java 17 を使うベースイメージ
FROM eclipse-temurin:17-jdk

# 作業ディレクトリを作成
WORKDIR /fridge-manager

# Maven Wrapper を含む全ファイルをコピー
COPY . .

# Mavenでビルド
RUN ./mvnw clean package -DskipTests

# JARファイルの名前に合わせて調整する（以下は例）
CMD ["java", "-jar", "target/fridge-manager-0.0.1-SNAPSHOT.jar"]
