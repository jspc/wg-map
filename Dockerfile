FROM golang:1.17.3-alpine as build

WORKDIR /app
RUN apk add --update ca-certificates

# Only add go specific sources to avoid large build contexts
ADD go.* ./
ADD *.go ./

RUN CGO_ENABLED=0 go build -o app && strip app

FROM scratch

CMD ["/app"]

COPY --from=build /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
ADD ui/build /ui/build
COPY --from=build /app/app /app
