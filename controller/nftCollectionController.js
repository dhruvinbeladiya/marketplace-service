const { HotCollectionModel } = require("contracts/build/lib/models");
const { NFTCollectionModel } = require("../model");

exports.getNFTCollection = async (req, res) => {
  try {
    if (req.query.creator != null) {
      const nftsCollection = await HotCollectionModel.find({
        owner: { $regex: new RegExp("^" + req.query.creator + "$", "i") },
      })
      .sort({ created_at: -1 })
  .populate('author').populate('owner');
      return res.send(nftsCollection);
    }

    if (req.query.address != null) {
      const nftsCollection = await HotCollectionModel.findOne({
        id: { $regex: new RegExp("^" + req.query.address + "$", "i") },
      }).populate('author');
      return res.send(nftsCollection);
    }
    const nftsCollection = await HotCollectionModel.find()
    .sort({ created_at: -1 })
    .
    populate("author");
    return res.send(nftsCollection);
  } catch (error) {
    return res.send(error);
  }
};

exports.postNFTCollection = async (req, res) => {
  try {
    const NFTsCollation = await NFTCollectionModel.create(req.body);
    res.send(NFTsCollation);
  } catch (error) {
    console.log(error);
  }
};
