import { Select, Flex, Heading, Box, Image, Button } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterData, getData, sortData } from "../Redux/actions";

export default function Hotel() {
  const dispatch = useDispatch();
  const rooms = useSelector((store) => store.rooms);

  useEffect(() => {
    apiCall();
  }, []);

  async function apiCall() {
    let data = await fetch("https://api-pawan-masai.herokuapp.com/movies");
    data = await data.json();
    dispatch(getData(data));
    console.log(data);
  }

  async function filterRoom(e) {
    let value = e.target.value;
    let res = await fetch(
      `https://api-pawan-masai.herokuapp.com/movies?=${value}`
    );
    res = await res.json().then((res) => dispatch(filterData(res)));
  }

  function sortRoom(e) {
    let sortBy = e.target.value;
    let sortedData = [...rooms];

    if (sortBy == "asc") {
      sortedData.sort((a, b) => {
        return a.vote_average - b.vote_average;
      });
    }

    if (sortBy == "desc") {
      sortedData.sort((a, b) => {
        return b.vote_average - a.vote_average;
      });
    }

    dispatch(sortData(sortedData));
  }
  const handleAdd = () => {
    fetch("");
  };
  return (
    <Flex w={"100vw"} flexDirection={"column"}>
      <Flex alignItems="center" justifyContent="center" w={"100%"} m={"1rem 0"}>
        <Select
          placeholder="Filter by category"
          width="300px"
          mr="2rem"
          onChange={filterRoom}
        >
          <option value="popularity">Popularity</option>
          <option value="release_date">Release Date</option>
          <option
            value="vote_average
"
          >
            Vote Average
          </option>
        </Select>

        <Select placeholder="Sort by price" width="300px" onChange={sortRoom}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </Select>
      </Flex>

      <Flex justifyContent={"space-evenly"} flexWrap={"wrap"}>
        {rooms.map((el, index) => {
          return (
            <Box
              boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}
              p={"1rem"}
              m={"1rem"}
              key={index}
            >
              <Image
                src={el.poster_path}
                alt="room"
                w={"400px"}
                h={"250px"}
              ></Image>
              <Box>
                <Heading m={"1rem 0"} size={"md"}></Heading>

                <p>Ttile : {el.title}</p>
                <p>Original Title: {el.original_title}</p>
                <p>Popularity : {el.popularity}</p>
                <p>Release Date : {el.release_date}</p>
                <p>Vote Average: {el.vote_average}</p>
                <p>Vote Count: {el.vote_count}</p>
                <Button
                  variant="solid"
                  colorScheme={"teal"}
                  m={"1rem 0"}
                  onClick={handleAdd}
                >
                  Book Now
                </Button>
              </Box>
            </Box>
          );
        })}
      </Flex>
    </Flex>
  );
}
