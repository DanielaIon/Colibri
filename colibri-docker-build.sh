cd api
docker build . -t daniellaion/colibri-api:latest
cd ..

cd mailer
docker build . -t daniellaion/colibri-mailer:latest
cd ..

echo All done!