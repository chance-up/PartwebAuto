# Partweb 자동화 프로젝트

## 0. 준비사항
+ Python 설치

## 1. 가상환경설정
+ 특정 위치에 가상환경들이 담길 폴더를 생성
> D:\venvs

+ 아래 명령어 이용하여 가상환경 생성
> D:\venvs > python -m venv **[사용할 가상환경 이름]**
   
+ 폴더 생성되었는지 확인 후, 해당 폴더의 **[Scripts]** 폴더로 접근하여 activate 명령어 입력
> [접속 전]
> 
> D:\venvs\[가상환경 이름]\Scripts > activate

> [접속 후] 
> 
> (가상환경 이름) D:\venvs\[가상환경 이름]\Scripts >  

+ 매번 해당 디렉토리명\activate 명령어를 수행하기 번거로우므로, 아래와 같이 batch파일 작성
> [D:\venvs 폴더를 환경변수에 등록 후]
> > 파일명 : **[프로젝트 명]**.cmd
> 
> @echo off
> 
> cd c:/projects/**[프로젝트 명]** 
> 
> c:/venvs/**[가상환경 이름]**/scripts/activate

+ 위와같이 저장 후, 터미널 환경에서 **[프로젝트 명]** 을 입력하면 바로 진입이 가능


## 2. 라이브러리 설치
+ 현재 라이브러리 내보내기(requirements.txt)
> pip freeze > requirements.txt

+ 일괄 설치
> pip install -r requirements.txt

## 3. pip 최신버전 update
> python -m pip install --upgrade pip

## 4. Flask 설치
> pip install Flask

## 5. python-dotenv 설치
> pip install python-dotenv
+ 이후 root 디렉토리에 .flaskenv 생성 후 아래와 같이 입력
> FLASK_APP = **[app이름]**
> 
> FLASK_ENV = development

## 6. MongoDB 기본
+ mongoDB 설치 이후 환경변수 등록
+ cmd에서 mongo 입력하여 db접속
> mongo

+ Database 목록 보기
> show dbs

+ Database 생성(내부에 collection 을 생성하지 않은 상태에서는, show dbs를 해도 보이지 않는다.)
> use **[새로 생성할 DB명]**

+ 현재 사용하고 있는 Database 이름 확인
> db

+ Collection 생성
> db.createCollection(**[Collection 명]**)

### 데이터삽입
+ Collection 에 Document 생성
> db.**[Collection 명]**.insertOne({ name:"ccs", gender:"", age:"30"});
> db.**[Collection 명]**.insertMany([{ name:"123", gender:"male", age:"30"},{ name:"456", gender:"female", age:"32"}]);

### 데이터 조회
> db.**[Collection 명]**.find();
> db.**[Collection 명]**.find({name:"123"});

### 데이터 수정
> db.**[Collection 명]**.UpdateOne({name:"123"},{$set:{age:20}});

### 데이터 삭제
> db.**[Collection 명]**.deleteOne({name:"123"});

## 7. MongoDB 연동
+ __init__.py에 다음과 같이 작성

