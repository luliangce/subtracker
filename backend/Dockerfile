FROM python:3.10.2-alpine3.15
WORKDIR /app
COPY ./requirements.txt /app/requirements.txt

RUN pip install -r requirements.txt -i https://mirrors.aliyun.com/pypi/simple/
EXPOSE 9000
ADD . /app
CMD [ "sh", "-c", "gunicorn -b 0.0.0.0:9000 xsgi.wsgi" ]