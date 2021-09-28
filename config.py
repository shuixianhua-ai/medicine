class Config:
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://root:123456@localhost:3306/online_medical'
    DEBUG = True
    CORS_ORIGIN_WHITELIST= 'http://localhost:3000/'
