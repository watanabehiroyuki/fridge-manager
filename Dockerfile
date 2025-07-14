# === ① ビルドステージ ===
FROM maven:3-eclipse-temurin-11 AS build
COPY ./ /home/app
WORKDIR /home/app
RUN mvn clean package -Dmaven.test.skip=true

# === ② 実行ステージ ===
FROM eclipse-temurin:11-alpine
COPY --from=build /home/app/target/fridge-manager-0.0.1-SNAPSHOT.jar /usr/local/lib/app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/usr/local/lib/app.jar"]