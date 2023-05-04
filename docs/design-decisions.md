# Design Decisions

## Client/Server Architecture

There are a variety of public domain or open information sources for Hanzi
information. Both as an experiment, and to minimize the complexity of the
application (at this stage), I have elected to use ChatGPT instead. ChatGPT is
prone to hallucination, but this has mostly not been a problem — especially for
the most important feature of the application for me, the generation of
mnemonics, which do not need to be accurate.

However. ChatGPT hallucinates the character component data, and this has been a problem. It means that the mnemonics that it creates are often useless.

I've chosen to fix this by augmenting the prompt with veridical information about the character decomposition.

The component data is 714KB. It zips to 221KB. The data that is currently used is 144KB uncompressed, so it would be entirely possible to download it to the client and search it there.

This would improve complexity (it would eliminate the API server), and the latency of single-character mnemonic generation. It wouldn't affect the latency of the remaining information modules, since they don't wait for the Hanzi API server response before initiating the Chat server requests.

## Prompt Construction

I didn't use [LangChain](https://langchain.readthedocs.io), since it didn't have an obvious mechanism for streaming partial results to the listener, and since I was in a hurry to get this learning project off the ground and had a different learning project in mind for LangChain. I did rename and modify `PromptTemplate` to a similar name and API as LangChain, to make it easier for someone familiar with that API to grok this one, and as a bit of investment in case I end up adopting to that library.
