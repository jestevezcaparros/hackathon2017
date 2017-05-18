from historical /streams/demo/mobile/happiness
group by contributor, timestamp window of 1 minute every 1 minute
select contributor, timestamp, contributor.user.gender as Happiness, last(position.latitude) as lat, last(position.longitude) as long