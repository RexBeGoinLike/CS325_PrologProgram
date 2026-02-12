:- use_module(library(lists)).

% FACTS: Course List

% First Year - First Sem
course(cs111).   course(cs111l).
course(cs112).   course(cs112l).  course(cs113).
course(fithw).   course(gart).    course(ghist).
course(gmath).   course(cfe101).

% First Year - Second Sem
course(cfe102).  course(cs121).   course(cs122).
course(cs122l).  course(cs123).   course(cs123l).
course(fitcs).   course(genvi).   course(gpcom).
course(gself).

% First Year - Short Term
course(cs131).   course(cs132).

% Second Year - First Sem
course(cfe103).  course(cs211).   course(cs211l).  
course(cs212).   course(cs212l).  course(cs213).   
course(fitoa).   course(grva).    course(gsts).    
course(nstpcwts1).

% Second Year - Second Sem
course(cfe104).  course(cs221).   course(cs221l).
course(cs222).   course(cs222l).  course(cs223).
course(fitaq).   course(gcworld). course(gethics).
course(nstpcwts2).

% Second Year - Short Term
course(cs231).   course(cs231l).  course(gentrep).
course(grizal).

% Third Year - First Sem
course(cfe105a). course(cs311).   course(cs311l).  
course(cs312).   course(cs312l).  course(cs313).   
course(cs314).   course(cs315).   course(csm316).  

% Third Year - Second Sem
course(cs321).  course(cs322).   course(cs322l).  
course(cs323).  course(cs323l).  course(cs324).  
course(cs325).  course(cfe105b).

% Third Year - Short Term
course(cs331).

% Fourth Year - First Sem
course(cfe106a). course(cs411).   course(cs412).
course(cs413).   course(cse15).   course(cse25).

% Fourth Year - Second Sem
course(cfe106b).  course(cs421).   course(cs422).  
course(forlang1).

% FACTS: Prerequisites
% Format: prerequisite(RequiredCourse, TargetCourse).

% First Year Second Sem
prerequisite(cs111, cs121).
prerequisite(cs112, cs122).
prerequisite(cs112, cs122l).
prerequisite(cs112, cs123).
prerequisite(cs112, cs123l).

% First Year Short Term
prerequisite(cs111, cs131).

% Second Year First Sem
prerequisite(cs112, cs211).
prerequisite(cs113, cs211l).
prerequisite(cs123, cs212).
prerequisite(cs123, cs212l).
prerequisite(cs122, cs213).

% Second Year Second Sem
prerequisite(cs211, cs221).
prerequisite(cs211, cs221l).
prerequisite(cs122, cs222).
prerequisite(cs122, cs222l).
prerequisite(cs132, cs223).

% Second Year Short Term
prerequisite(cs212, cs231).
prerequisite(cs212, cs231l).

% Third Year First Sem
prerequisite(cs122, cs311).
prerequisite(cs122, cs311l).
prerequisite(cs211, cs312).
prerequisite(cs211, cs312l).
prerequisite(cs221, cs313).
prerequisite(cs131, cs313).
prerequisite(cs111, cs314).
prerequisite(gself, cs314).
prerequisite(cs111, cs315).
prerequisite(gpcom, cs315).
prerequisite(cs132, csm316).

% Third Year Second Sem
prerequisite(cs132, cs321).
prerequisite(cs211, cs321l).
prerequisite(cs221, cs322).
prerequisite(cs221, cs322l).
prerequisite(cs211, cs323).
prerequisite(cs132, cs323).
prerequisite(cs211, cs323l).
prerequisite(cs132, cs323l).
prerequisite(cs211, cs325).

% Third Year Short Term
prerequisite(cs321, cs331).
prerequisite(cs321l, cs331).
prerequisite(cs322, cs331).
prerequisite(cs322l, cs331).
prerequisite(cs323, cs331).
prerequisite(cs323l, cs331).
prerequisite(cs325, cs331).
prerequisite(cfe105a, cs331).
prerequisite(cfe105b, cs331).

% Fourth Year First Term
prerequisite(cs324, cs411).
prerequisite(cs231, cs413).
prerequisite(gethics, cs413).

% information assurance and security
prerequisite(cs111, cs412).
prerequisite(cs111l, cs412).
prerequisite(cs112, cs412).
prerequisite(cs112l, cs412).
prerequisite(cs113, cs412).
prerequisite(cs121, cs412).
prerequisite(cs121l, cs412).
prerequisite(cs122, cs412).
prerequisite(cs122l, cs412).
prerequisite(cs123, cs412).
prerequisite(cs123l, cs412).

prerequisite(cs131, cs412).
prerequisite(cs132, cs412).

prerequisite(cs211, cs412).
prerequisite(cs211l, cs412).
prerequisite(cs212, cs412).
prerequisite(cs212l, cs412).
prerequisite(cs213, cs412).

prerequisite(cs221, cs412).
prerequisite(cs221l, cs412).
prerequisite(cs222, cs412).
prerequisite(cs222l, cs412).
prerequisite(cs223, cs412).

prerequisite(cs231, cs412).
prerequisite(cs231l, cs412).

prerequisite(cs311, cs412).
prerequisite(cs311l, cs412).
prerequisite(cs312, cs412).
prerequisite(cs312l, cs412).
prerequisite(cs313, cs412).
prerequisite(cs314, cs412).
prerequisite(cs315, cs412).
prerequisite(cs316, cs412).

prerequisite(cs321, cs412).
prerequisite(cs322, cs412).
prerequisite(cs322l, cs412).
prerequisite(cs323, cs412).
prerequisite(cs323l, cs412).
prerequisite(cs324, cs412).
prerequisite(cs325, cs412).

prerequisite(cs331, cs412).



% Fourth Year Second Sem
prerequisite(cs411, cs421).

% CFE Sequence
prerequisite(cfe103, cfe104).
prerequisite(cfe103, cfe105a).
prerequisite(cfe104, cfe105a).
prerequisite(cfe105a, cfe105b).
prerequisite(cfe105b, cfe106a).
prerequisite(cfe106a, cfe106b).

% NSTP Sequence
prerequisite(nstpcwts1, nstpcwts2).

% Electives
prerequisite(cs211, cse).
prerequisite(cs211l, cse).
prerequisite(cs212, cse).
prerequisite(cs212l, cse).
prerequisite(cs213, cse).

prerequisite(cs221, cse).
prerequisite(cs221l, cse).
prerequisite(cs222, cse).
prerequisite(cs222l, cse).
prerequisite(cs223, cse).

prerequisite(cs231, cse).
prerequisite(cs231l, cse).