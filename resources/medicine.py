from flask_restful import Resource
from flask_restful.reqparse import RequestParser
from sqlalchemy.exc import SQLAlchemyError
from models import db
from common import code, pretty_result
from models.medicine import Medicine


class ArticleSource(Resource):
    def __init__(self):
        self.parser = RequestParser()
        self.token_parser = RequestParser()

    def get(self):
        try:
            data=[]
            posts = Medicine.query.all()#falsk的sql语句这里不知道怎么把
            for post in posts:
                data.append({
                    'mid': str(post.mid),
                    'medNameZh': str(post.medNameZh),
                    'medSerialNo': int(post.medSerialNo),
                    'medType': str(post.medType),
                    'medPrice': str(post.medPrice),
                    'medIcon': str(post.medIcon),
                    'other': str(post.other)

                })

            return pretty_result(code.OK, data=data)
        except SQLAlchemyError as e:
            print(e)
            db.session.rollback()
            return pretty_result(code.DB_ERROR)
#可能用不到
    """def post(self):
        try:
            self.parser.add_argument('medNameZh', type=str, location='args')
            self.parser.add_argument('medIcon', type=str, location='args')
            self.parser.add_argument('medType', type=str, location='args')
            self.parser.add_argument('medPrice', type=str, location='args')
            self.parser.add_argument('other', type=str, location='args')
            args = self.parser.parse_args()
            print(args)
            post = PostModel(
                medNameZh=args['medNameZh'],
                medIcon=args['medIcon'],
                medType=args['medType'],
                Type=0,
                Content=args['content'],
            )
            db.session.add(post)
            db.session.commit()
            return pretty_result(code.OK)
        except SQLAlchemyError as e:
            print(e)
            db.session.rollback()
            return pretty_result(code.DB_ERROR)"""
#可能也用不到
"""
class ArticleContent(Resource):
    def __init__(self):
        self.parser = RequestParser()

    def get(self, source_id):
        try:
            source = Medicine.query.get(source_id)
            data = {
                'id': source.Source_id,
                'title': source.Title,
                'author': source.Author,
                'date': str(source.Date)[0:16],
                'content': source.Content,
                'type': source.Type
            }
            return pretty_result(code.OK, data=data)
        except SQLAlchemyError as e:
            print(e)
            db.session.rollback()
            return pretty_result(code.DB_ERROR)"""