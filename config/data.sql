SHOW GRANTS FOR 'root'@'localhost';

use myOj;

select * from `Submissions`;

update `Submissions` set verdict = "pending" where verdict = "Wrong Answer";

SHOW CREATE TABLE Clarifications;
SHOW CREATE TABLE Submissions;
show create table TestCases;
show create table Editorials;
show create table Problems;
show create table Contests;

ALTER TABLE `TestCases` DROP FOREIGN KEY TestCases_ibfk_1;

ALTER TABLE `Editorials` DROP FOREIGN KEY Editorials_ibfk_2;

ALTER TABLE `Editorials`
ADD CONSTRAINT Editorials_ibfk_2
FOREIGN KEY (addedBy)
REFERENCES Admins(id)
ON DELETE CASCADE;

ALTER TABLE TestCases
ADD CONSTRAINT TestCases_problem_fkey
FOREIGN KEY (problemId)
REFERENCES Problems(id)
ON DELETE CASCADE;


ALTER TABLE Contests
MODIFY COLUMN startTime varchar(255);

delete * from Contests;

ALTER TABLE Problems CHANGE problem problemSetter VARCHAR(255);


alter table `Problems`
add column problemType enum("fixed", "interactive", "outputOnly") DEFAULT "fixed";

ALTER TABLE Problems
MODIFY COLUMN contestId INTEGER NULL;

add column sampleOutut varchar(255)

ALTER TABLE Editorials
drop COLUMN addedBy;


