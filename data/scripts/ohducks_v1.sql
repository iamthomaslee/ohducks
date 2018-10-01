CREATE TABLE ohducks_v1 (
  ID SERIAL     PRIMARY KEY,
  feedtime      VARCHAR,
  whatfood      VARCHAR,
  feedlocation  VARCHAR,
  manyducks     INTEGER,
  kindfood      VARCHAR,
  muchfood      INTEGER,
  createdon     TIMESTAMP
);
