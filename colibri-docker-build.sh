cd api
docker build . -t dana/colibri-api:latest
cd ..

cd mailer
docker build . -t dana/colibri-mailer:latest
cd ..

cd webclient
docker build . -t dana/colibri-webclient:latest
cd ..

echo All done!