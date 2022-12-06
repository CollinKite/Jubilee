cd into the project root folder and run the following commands:
    docker image build -t jubilee_frontend -f Dockerfile .
    docker run -p 80:3000 -d jubilee_frontend
